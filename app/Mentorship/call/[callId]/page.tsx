"use client";
import React, { useState, useEffect, useRef } from "react";
import { PhoneOff, Mic, MicOff, Video, VideoOff, Camera } from "lucide-react";
import { getCurrentUser } from "@/lib/serveractions";
import axios from "axios";
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
interface PageProps {
  params: { callId: string };
}
const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};
const pc = new RTCPeerConnection(servers);

const VideoCallPage = ({ params }: PageProps) => {
  const { callId } = params;
  const [isCallActive, setIsCallActive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [roomId, setRoomId] = useState(callId);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const localRef = useRef<HTMLVideoElement | null>(null);
  const remoteRef = useRef<HTMLVideoElement | null>(null);
  const [webcamActive, setWebcamActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration((duration) => duration + 1);
      }, 1000);
    } else if (!isCallActive && callDuration !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isCallActive, callDuration]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  useEffect(() => {
    if (isCallActive) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isCallActive]);

  const handleEndCall = () => {
    setIsCallActive(false);
  };

  const setupSources = async (role: string) => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    console.log("Local tracks:", localStream.getTracks());
    console.log("Video tracks:", localStream.getVideoTracks());

    const remoteStream = new MediaStream();

    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    localRef.current.srcObject = localStream;
    remoteRef.current.srcObject = remoteStream;


    console.log("Assigned to localRef:", localRef.current?.srcObject);

    setWebcamActive(true);

    if (role === "mentor") {
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
        event.candidate &&
          (await addDoc(offerCandidates, event.candidate.toJSON()));
      };

      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      await setDoc(callDoc, { offer });

      onSnapshot(callDoc, (snapshot) => {
        const data = snapshot.data();
        if (!pc.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.setRemoteDescription(answerDescription);
        }
      });

      onSnapshot(answerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.addIceCandidate(candidate);
          }
        });
      });
    } else if (role === "mentee") {
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
        event.candidate &&
          (await addDoc(answerCandidates, event.candidate.toJSON()));
      };

      const snapshot = await getDoc(callDoc);
      const callData = snapshot.data();

      const offerDescription = callData.offer;
      await pc.setRemoteDescription(
        new RTCSessionDescription(offerDescription)
      );

      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      await updateDoc(callDoc, { answer });
      onSnapshot(offerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const data = change.doc.data();
            pc.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
    }

    const hangUp = async () => {
      pc.close();

      if (roomId) {
        const roomRef = doc(firestore, "calls", roomId);

        const answerCandidatesRef = collection(
          firestore,
          "calls",
          roomId,
          "answerCandidates"
        );
        const answerSnap = await getDocs(answerCandidatesRef);
        answerSnap.forEach(async (docSnap) => {
          await deleteDoc(docSnap.ref);
        });

        const offerCandidatesRef = collection(
          firestore,
          "calls",
          roomId,
          "offerCandidates"
        );
        const offerSnap = await getDocs(offerCandidatesRef);
        offerSnap.forEach(async (docSnap) => {
          await deleteDoc(docSnap.ref);
        });

        await deleteDoc(roomRef);
      }
      window.location.reload();
    };
    pc.onconnectionstatechange = (event) => {
      if (pc.connectionState === "disconnected") {
        hangUp();
      }
    };
  };
  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();
      const res = await axios.get(`/api/booking?callId=${callId}`);
      let role;
      if (user._id == res.data.data.mentorId) {
        role = "mentor";
      } else {
        role = "mentee";
      }
      await setupSources(role);
    })();
  }, []);
  return (
    <div
      className="video-call-page relative w-full h-screen bg-black overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{
        cursor: showControls ? "default" : "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
      }}
    >
      {/* Remote Video - Full Screen Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={remoteRef}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          muted={false}
        />
        {/* Placeholder for remote video when no stream */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center text-gray-700">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/60 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm border border-gray-200 shadow-lg">
              <Camera size={32} className="sm:w-12 sm:h-12 text-gray-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-800">
              Remote Participant
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Waiting for video stream...
            </p>
          </div>
        </div>
      </div>

      {/* Local Video - Picture in Picture (Bottom Right) - Responsive */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-32 h-24 sm:w-64 sm:h-48 md:w-80 md:h-60 bg-white rounded-lg overflow-hidden border-2 border-gray-200 shadow-xl">
        <video
          ref={localRef}
          className={`w-full h-full object-cover`}
          autoPlay
          playsInline
          muted
        />
        {/* Placeholder for local video */}
        {!webcamActive && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="text-center text-gray-700">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/60 rounded-full flex items-center justify-center mb-2 mx-auto border border-gray-200">
                <Camera size={16} className="sm:w-6 sm:h-6 text-gray-600" />
              </div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                You
              </p>
            </div>
          </div>
        )}

        {/* Video off overlay */}
      </div>

      {/* Timer Display - Responsive */}
      <div
        className={`absolute top-4 left-4 sm:top-6 sm:left-6 bg-white/80 backdrop-blur-md text-gray-800 px-3 py-2 sm:px-5 sm:py-3 rounded-xl font-mono text-base sm:text-xl border border-gray-200 shadow-lg transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {formatTime(callDuration)}
      </div>

      {/* Call Controls - Responsive */}
      <div
        className={`absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 sm:space-x-6 transition-all duration-300 ${
          showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Mute Button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg backdrop-blur-md border-2 ${
            isMuted
              ? "bg-red-500/90 hover:bg-red-600/90 border-red-400/50"
              : "bg-white/80 hover:bg-white/90 border-gray-200/50"
          }`}
        >
          {isMuted ? (
            <MicOff size={20} className="sm:w-7 sm:h-7 text-white" />
          ) : (
            <Mic size={20} className="sm:w-7 sm:h-7 text-gray-700" />
          )}
        </button>

        {/* End Call Button */}
        <button
          onClick={handleEndCall}
          className="w-16 h-16 sm:w-20 sm:h-20 bg-red-500/90 hover:bg-red-600/90 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-105 shadow-xl backdrop-blur-md border-2 border-red-400/50"
        >
          <PhoneOff size={24} className="sm:w-8 sm:h-8 text-white" />
        </button>

        {/* Video Toggle Button */}
        <button
          // onClick={() => setIsVideoOff(!isVideoOff)}
          className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg backdrop-blur-md border-2`}
        ></button>
      </div>
    </div>
  );
};

export default VideoCallPage;
