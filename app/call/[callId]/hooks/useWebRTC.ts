import { useRef, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "@/lib/firebase";

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

interface FormData {
  Role: string;
  mentorId: string;
  menteeId: string;
}

export const useWebRTC = (callId: string) => {
  const [webcamActive, setWebcamActive] = useState(false);
  const [remoteStreamActive, setRemoteStreamActive] = useState(false);
  const [roomId, setRoomId] = useState(callId);

  const localRef = useRef<HTMLVideoElement | null>(null);
  const remoteRef = useRef<HTMLVideoElement | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);

  const initializePeerConnection = () => {
    if (pcRef.current) {
      pcRef.current.close();
    }

    pcRef.current = new RTCPeerConnection(servers);
    return pcRef.current;
  };

  const setupSources = async (role: string) => {
    try {
      console.log("Setting up sources for role:", role);

      const pc = initializePeerConnection();

      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      console.log("Local stream tracks:", localStream.getTracks());
      localStreamRef.current = localStream;

      const remoteStream = new MediaStream();
      remoteStreamRef.current = remoteStream;

      localStream.getTracks().forEach((track) => {
        console.log("Adding track to PC:", track.kind, track.id);
        pc.addTrack(track, localStream);
      });

      pc.ontrack = (event) => {
        console.log("Received remote track:", event.track.kind, event.track.id);
        console.log("Remote streams:", event.streams);

        event.streams[0].getTracks().forEach((track) => {
          console.log("Adding remote track:", track.kind, track.id);
          remoteStreamRef.current?.addTrack(track);
        });

        if (remoteRef.current && remoteStreamRef.current) {
          remoteRef.current.srcObject = remoteStreamRef.current;
          setRemoteStreamActive(true);
          console.log("Remote stream assigned to video element");
        }
      };

      if (localRef.current) {
        localRef.current.srcObject = localStream;
        console.log("Local stream assigned to video element");
      }

      if (remoteRef.current) {
        remoteRef.current.srcObject = remoteStream;
      }

      setWebcamActive(true);

      pc.onconnectionstatechange = () => {
        console.log("Connection state:", pc.connectionState);
        if (
          pc.connectionState === "disconnected" ||
          pc.connectionState === "failed"
        ) {
          hangUp();
        }
      };

      pc.oniceconnectionstatechange = () => {
        console.log("ICE connection state:", pc.iceConnectionState);
      };

      if (role === "mentor") {
        await setupMentorConnection(pc);
      } else if (role === "mentee") {
        await setupMenteeConnection(pc);
      }
    } catch (error) {
      console.error("Error setting up sources:", error);
    }
  };

  const setupMentorConnection = async (pc: RTCPeerConnection) => {
    const callDoc = doc(firestore, "calls", callId);
    const offerCandidates = collection(
      firestore,
      "calls",
      callId,
      "offerCandidates"
    );
    const answerCandidates = collection(
      firestore,
      "calls",
      callId,
      "answerCandidates"
    );

    setRoomId(callDoc.id);

    pc.onicecandidate = async (event) => {
      if (event.candidate) {
        console.log("Adding offer candidate:", event.candidate);
        await addDoc(offerCandidates, event.candidate.toJSON());
      }
    };

    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await setDoc(callDoc, { offer });
    console.log("Offer created and saved");

    onSnapshot(callDoc, (snapshot) => {
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        console.log("Received answer, setting remote description");
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });

    onSnapshot(answerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          console.log("Adding answer candidate:", candidate);
          pc.addIceCandidate(candidate);
        }
      });
    });
  };

  const setupMenteeConnection = async (pc: RTCPeerConnection) => {
    const callDoc = doc(firestore, "calls", callId);
    const offerCandidates = collection(
      firestore,
      "calls",
      callId,
      "offerCandidates"
    );
    const answerCandidates = collection(
      firestore,
      "calls",
      callId,
      "answerCandidates"
    );

    pc.onicecandidate = async (event) => {
      if (event.candidate) {
        console.log("Adding answer candidate:", event.candidate);
        await addDoc(answerCandidates, event.candidate.toJSON());
      }
    };

    const snapshot = await getDoc(callDoc);
    const callData = snapshot.data();

    if (!callData?.offer) {
      console.error("No offer found in call document");
      return;
    }

    const offerDescription = callData.offer;
    console.log("Received offer, setting remote description");
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await updateDoc(callDoc, { answer });
    console.log("Answer created and saved");

    onSnapshot(offerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const data = change.doc.data();
          const candidate = new RTCIceCandidate(data);
          console.log("Adding offer candidate:", candidate);
          pc.addIceCandidate(candidate);
        }
      });
    });
  };

  const hangUp = async (formData?: FormData) => {
    console.log("Hanging up call");
    if (formData) {
      console.log(formData);
    }

    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    if (roomId) {
      try {
        const roomRef = doc(firestore, "calls", roomId);

        const answerCandidatesRef = collection(
          firestore,
          "calls",
          roomId,
          "answerCandidates"
        );
        const answerSnap = await getDocs(answerCandidatesRef);
        const deleteAnswerPromises = answerSnap.docs.map((docSnap) =>
          deleteDoc(docSnap.ref)
        );

        const offerCandidatesRef = collection(
          firestore,
          "calls",
          roomId,
          "offerCandidates"
        );
        const offerSnap = await getDocs(offerCandidatesRef);
        const deleteOfferPromises = offerSnap.docs.map((docSnap) =>
          deleteDoc(docSnap.ref)
        );

        await Promise.all([...deleteAnswerPromises, ...deleteOfferPromises]);
        await deleteDoc(roomRef);

        console.log("Firestore cleanup completed");
      } catch (error) {
        console.error("Error during cleanup:", error);
      }
    }
  };

  return {
    localRef,
    remoteRef,
    webcamActive,
    remoteStreamActive,
    setupSources,
    hangUp
  };
};