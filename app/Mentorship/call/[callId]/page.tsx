"use client";
import React, { useState, useEffect, useRef } from "react";
import { PhoneOff, Mic, MicOff, Video, VideoOff, Camera } from "lucide-react";
import { getCurrentUser } from "@/lib/serverAction/userAction";
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
import { useRouter } from "next/navigation";
import RatingPage from "./Rating";
import { useUser } from "@clerk/nextjs";

interface PageProps {
  params: { callId: string };
}

// Enhanced STUN/TURN servers configuration
const servers = {
  iceServers: [
    {
      urls: [
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
        "stun:stun3.l.google.com:19302",
        "stun:stun4.l.google.com:19302"
      ],
    },
    // Add TURN servers for better connectivity
    // {
    //   urls: "turn:your-turn-server.com:3478",
    //   username: "your-username",
    //   credential: "your-password"
    // }
  ],
  iceCandidatePoolSize: 10,
};

const VideoCallPage = ({ params }: PageProps) => {
  const { user } = useUser();
  const { callId } = params;
  const [isCallActive, setIsCallActive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [roomId, setRoomId] = useState(callId);
  const [webcamActive, setWebcamActive] = useState(false);
  const [remoteStreamActive, setRemoteStreamActive] = useState(false);
  const [connectionState, setConnectionState] = useState("new");
  const [mediaError, setMediaError] = useState<string | null>(null);

  const router = useRouter();
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const localRef = useRef<HTMLVideoElement | null>(null);
  const remoteRef = useRef<HTMLVideoElement | null>(null);

  // Refs for WebRTC
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const unsubscribeRefs = useRef<(() => void)[]>([]);
  const isCleaningUpRef = useRef(false);

  const [formData, setFormData] = useState({
    Role: "",
    mentorId: "",
    menteeId: "",
  });
  const [callEnded, setCallEnded] = useState(false);

  // Initialize RTCPeerConnection with proper error handling
  const initializePeerConnection = () => {
    try {
      if (pcRef.current) {
        pcRef.current.close();
      }

      const pc = new RTCPeerConnection(servers);
      
      // Enhanced connection state monitoring
      pc.onconnectionstatechange = () => {
        console.log("Connection state:", pc.connectionState);
        setConnectionState(pc.connectionState);
        
        if (pc.connectionState === "failed") {
          console.error("Connection failed, attempting restart");
          // Don't immediately hang up, try to recover
          setTimeout(() => {
            if (pc.connectionState === "failed" && !isCleaningUpRef.current) {
              handleConnectionFailure();
            }
          }, 3000);
        }
      };

      // ICE connection state monitoring
      pc.oniceconnectionstatechange = () => {
        console.log("ICE connection state:", pc.iceConnectionState);
        
        if (pc.iceConnectionState === "failed") {
          console.error("ICE connection failed");
          // Try ICE restart
          pc.restartIce();
        }
      };

      // Handle ICE gathering state
      pc.onicegatheringstatechange = () => {
        console.log("ICE gathering state:", pc.iceGatheringState);
      };

      pcRef.current = pc;
      return pc;
    } catch (error) {
      console.error("Failed to initialize peer connection:", error);
      setMediaError("Failed to initialize connection");
      return null;
    }
  };

  const handleConnectionFailure = async () => {
    if (isCleaningUpRef.current) return;
    
    console.log("Handling connection failure - attempting to restart");
    try {
      // Clean up current connection
      await hangUp(false);
      
      // Wait a bit before restarting
      setTimeout(async () => {
        if (!isCleaningUpRef.current) {
          console.log("Restarting connection...");
          await setupSources(formData.Role);
        }
      }, 2000);
    } catch (error) {
      console.error("Failed to restart connection:", error);
    }
  };

  // Separate effect to reset states on mount
  useEffect(() => {
    // Reset all initialization states on component mount
    isCleaningUpRef.current = false;
    isInitializingRef.current = false;
    setIsInitialized(false);
    
    return () => {
      // Component is unmounting
      setIsInitialized(false);
      isInitializingRef.current = false;
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration((duration) => duration + 1);
      }, 1000);
    } else if (!isCallActive && callDuration !== 0) {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCallActive, callDuration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
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

  const handleEndCall = async () => {
    console.log("Ending call for role:", formData.Role);
    isCleaningUpRef.current = true;
    setIsCallActive(false);

    if (formData.Role === "mentee") {
      setCallEnded(true);
    } else {
      router.push("/Mentor");
    }
    
    // Single hangUp call
    await hangUp(true);
  };

  const setupSources = async (role: string) => {
    try {
      console.log("Setting up sources for role:", role);
      
      // Prevent multiple setup calls
      if (isCleaningUpRef.current) {
        console.log("Aborting setup - component is cleaning up");
        return;
      }

      setMediaError(null);

      // Initialize peer connection
      const pc = initializePeerConnection();
      if (!pc) {
        console.error("Failed to initialize peer connection");
        return;
      }

      // Verify peer connection is in correct state
      if (pc.signalingState === 'closed') {
        console.error("Peer connection is already closed, aborting setup");
        setMediaError("Connection setup failed - peer connection closed");
        return;
      }

      console.log("Peer connection initialized, signaling state:", pc.signalingState);

      // Get user media with proper constraints and error handling
      let localStream: MediaStream;
      try {
        localStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280, max: 1920 },
            height: { ideal: 720, max: 1080 },
            facingMode: "user"
          },
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });
      } catch (mediaErr) {
        console.error("Failed to get user media:", mediaErr);
        setMediaError("Camera/microphone access denied or unavailable");
        return;
      }

      console.log("Local stream tracks:", localStream.getTracks());
      localStreamRef.current = localStream;

      // Create remote stream
      const remoteStream = new MediaStream();
      remoteStreamRef.current = remoteStream;

      // Add local tracks to peer connection
      localStream.getTracks().forEach((track) => {
        console.log("Adding track to PC:", track.kind, track.id);
        // Double-check peer connection state before adding track
        if (pc.signalingState !== 'closed') {
          pc.addTrack(track, localStream);
        } else {
          console.error("Cannot add track - peer connection is closed");
          throw new Error("Peer connection closed during track addition");
        }
      });

      // Handle incoming tracks with better error handling
      pc.ontrack = (event) => {
        console.log("Received remote track:", event.track.kind, event.track.id);
        console.log("Remote streams:", event.streams);

        if (event.streams && event.streams[0]) {
          // Clear existing remote stream
          if (remoteStreamRef.current) {
            remoteStreamRef.current.getTracks().forEach(track => {
              remoteStreamRef.current?.removeTrack(track);
            });
          }

          // Add new tracks
          event.streams[0].getTracks().forEach((track) => {
            console.log("Adding remote track:", track.kind, track.id);
            remoteStreamRef.current?.addTrack(track);
          });

          // Update remote video element
          if (remoteRef.current && remoteStreamRef.current) {
            remoteRef.current.srcObject = remoteStreamRef.current;
            setRemoteStreamActive(true);
            console.log("Remote stream assigned to video element");
          }
        }
      };

      // Set local video with error handling
      if (localRef.current) {
        try {
          localRef.current.srcObject = localStream;
          // Ensure video plays
          localRef.current.onloadedmetadata = () => {
            localRef.current?.play().catch(console.error);
          };
          console.log("Local stream assigned to video element");
        } catch (error) {
          console.error("Error setting local video:", error);
        }
      }

      // Set remote video (initially empty)
      if (remoteRef.current) {
        remoteRef.current.srcObject = remoteStream;
        remoteRef.current.onloadedmetadata = () => {
          remoteRef.current?.play().catch(console.error);
        };
      }

      setWebcamActive(true);

      if (role === "mentor") {
        await setupMentorConnection(pc);
      } else if (role === "mentee") {
        await setupMenteeConnection(pc);
      }
    } catch (error) {
      console.error("Error setting up sources:", error);
      setMediaError("Failed to setup video call");
    }
  };

  const setupMentorConnection = async (pc: RTCPeerConnection) => {
    try {
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

      // Handle ICE candidates
      pc.onicecandidate = async (event) => {
        if (event.candidate && !isCleaningUpRef.current) {
          console.log("Adding offer candidate:", event.candidate);
          try {
            await addDoc(offerCandidates, event.candidate.toJSON());
          } catch (error) {
            console.error("Error adding offer candidate:", error);
          }
        }
      };

      // Create and set offer
      const offerDescription = await pc.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true
      });
      await pc.setLocalDescription(offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      await setDoc(callDoc, { offer });
      console.log("Offer created and saved");

      // Listen for answer
      const unsubscribeAnswer = onSnapshot(callDoc, (snapshot) => {
        const data = snapshot.data();
        if (!pc.currentRemoteDescription && data?.answer) {
          console.log("Received answer, setting remote description");
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.setRemoteDescription(answerDescription).catch(console.error);
        }
      });

      // Listen for answer candidates
      const unsubscribeCandidates = onSnapshot(answerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added" && !isCleaningUpRef.current) {
            const candidate = new RTCIceCandidate(change.doc.data());
            console.log("Adding answer candidate:", candidate);
            pc.addIceCandidate(candidate).catch(console.error);
          }
        });
      });

      unsubscribeRefs.current.push(unsubscribeAnswer, unsubscribeCandidates);
    } catch (error) {
      console.error("Error in mentor connection setup:", error);
      setMediaError("Failed to setup mentor connection");
    }
  };

  const setupMenteeConnection = async (pc: RTCPeerConnection) => {
    try {
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

      // Handle ICE candidates
      pc.onicecandidate = async (event) => {
        if (event.candidate && !isCleaningUpRef.current) {
          console.log("Adding answer candidate:", event.candidate);
          try {
            await addDoc(answerCandidates, event.candidate.toJSON());
          } catch (error) {
            console.error("Error adding answer candidate:", error);
          }
        }
      };

      // Get offer and create answer
      const snapshot = await getDoc(callDoc);
      const callData = snapshot.data();

      if (!callData?.offer) {
        console.error("No offer found in call document");
        setMediaError("No offer found from mentor");
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

      // Listen for offer candidates
      const unsubscribeCandidates = onSnapshot(offerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added" && !isCleaningUpRef.current) {
            const data = change.doc.data();
            const candidate = new RTCIceCandidate(data);
            console.log("Adding offer candidate:", candidate);
            pc.addIceCandidate(candidate).catch(console.error);
          }
        });
      });

      unsubscribeRefs.current.push(unsubscribeCandidates);
    } catch (error) {
      console.error("Error in mentee connection setup:", error);
      setMediaError("Failed to setup mentee connection");
    }
  };

  const hangUp = async (shouldCleanupFirestore: boolean = true) => {
    console.log("Hanging up call, shouldCleanupFirestore:", shouldCleanupFirestore);
    isCleaningUpRef.current = true;

    // Unsubscribe from Firestore listeners
    unsubscribeRefs.current.forEach(unsubscribe => {
      try {
        unsubscribe();
      } catch (error) {
        console.error("Error unsubscribing:", error);
      }
    });
    unsubscribeRefs.current = [];

    // Close peer connection
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }

    // Stop local tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      localStreamRef.current = null;
    }

    // Clear video elements
    if (localRef.current) {
      localRef.current.srcObject = null;
    }
    if (remoteRef.current) {
      remoteRef.current.srcObject = null;
    }

    setWebcamActive(false);
    setRemoteStreamActive(false);

    // Clean up Firestore documents only when fully ending call
    if (shouldCleanupFirestore && roomId) {
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
    
    // Don't reset cleanup flag here - let the new component instance handle it
  };

  const toggleMute = () => {
    if (localStreamRef.current) {
      const audioTracks = localStreamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = isMuted; // Toggle enabled state
      });
      setIsMuted(!isMuted);
    }
  };

  // Add initialization state to prevent multiple calls
  const [isInitialized, setIsInitialized] = useState(false);
  const isInitializingRef = useRef(false);

  useEffect(() => {
    const initializeCall = async () => {
      try {
        // Reset cleanup flag for fresh initialization
        isCleaningUpRef.current = false;
        
        // Prevent multiple initialization with both state and ref
        if (isInitialized || isInitializingRef.current) {
          console.log("Skipping initialization - already initialized/initializing");
          return;
        }

        if (!user?.id) {
          console.error("User not available");
          return;
        }

        console.log("Starting call initialization...");
        isInitializingRef.current = true;
        setIsInitialized(true);

        const res = await axios.get(`/api/booking?callId=${callId}`);
        const { data } = await axios.get(
          `/api/mentor/profile?userId=${user.id}`
        );
        const userId = data.data.profile._id;
        console.log("User ID:", userId);

        let role: string;
        if (userId === res.data.data.mentorId) {
          role = "mentor";
        } else {
          role = "mentee";
        }

        setFormData({
          Role: role,
          mentorId: res.data.data.mentorId,
          menteeId: res.data.data.menteeId,
        });
        
        await setupSources(role);
        console.log("Call initialization completed successfully");
      } catch (error) {
        console.error("Error initializing call:", error);
        setMediaError("Failed to initialize call");
        setIsInitialized(false); // Reset on error to allow retry
        isCleaningUpRef.current = false; // Reset cleanup flag on error
      } finally {
        isInitializingRef.current = false;
      }
    };

    // Add a small delay to prevent rapid re-initialization
    const initTimer = setTimeout(initializeCall, 100);

    // Cleanup on unmount
    return () => {
      clearTimeout(initTimer);
      console.log("Component unmounting, cleaning up...");
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      isCleaningUpRef.current = true;
      hangUp(true);
    };
  }, [callId, user?.id]); // Remove isInitialized from dependencies

  return (
    <div
      className="video-call-page relative w-full h-screen bg-black overflow-hidden pb-[88px] sm:pb-0"
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
      {/* Connection Status Indicator */}
      {connectionState !== "connected" && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-yellow-500/90 text-white px-4 py-2 rounded-lg z-50">
          Connection: {connectionState}
        </div>
      )}

      {/* Error Message */}
      {mediaError && (
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2 bg-red-500/90 text-white px-4 py-2 rounded-lg z-50 max-w-md text-center">
          {mediaError}
        </div>
      )}

      {/* Remote Video - Full Screen Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={remoteRef}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          muted={false}
        />
        {!remoteStreamActive && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="text-center text-gray-700">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/60 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm border border-gray-200 shadow-lg">
                <Camera size={32} className="sm:w-12 sm:h-12 text-gray-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-800">
                Remote Participant
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                {connectionState === "connecting" ? "Connecting..." : "Waiting for video stream..."}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Local Video - Raised on small screens */}
      <div className="absolute bottom-40 right-4 sm:bottom-6 sm:right-6 w-32 h-24 sm:w-64 sm:h-48 md:w-80 md:h-60 bg-white rounded-lg overflow-hidden border-2 border-gray-200 shadow-xl">
        <video
          ref={localRef}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          muted
        />
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
      </div>

      {/* Timer Display */}
      <div
        className={`absolute top-4 left-4 sm:top-6 sm:left-6 bg-white/80 backdrop-blur-md text-gray-800 px-3 py-2 sm:px-5 sm:py-3 rounded-xl font-mono text-base sm:text-xl border border-gray-200 shadow-lg transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {formatTime(callDuration)}
      </div>

      {/* Call Controls - Lifted on small screens */}
      <div
        className={`absolute bottom-28 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 sm:space-x-6 transition-all duration-300 ${
          showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <button
          onClick={toggleMute}
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

        <button
          onClick={handleEndCall}
          className="w-16 h-16 sm:w-20 sm:h-20 bg-red-500/90 hover:bg-red-600/90 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-105 shadow-xl backdrop-blur-md border-2 border-red-400/50"
        >
          <PhoneOff size={24} className="sm:w-8 sm:h-8 text-white" />
        </button>

        <button className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg backdrop-blur-md border-2 bg-white/80 hover:bg-white/90 border-gray-200/50">
          <Video size={20} className="sm:w-7 sm:h-7 text-gray-700" />
        </button>
      </div>

      {callEnded && <RatingPage formData={formData} />}
    </div>
  );
};

export default VideoCallPage;