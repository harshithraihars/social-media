"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useCallTimer } from "./hooks/useCallTimer";
import VideoContainer from "./components/videoContainer";
import CallTimer from "./components/callTimer";
import CallControls from "./components/callControls";
import CallWarning from "./components/callWarning";
import RatingPage from "@/app/Mentorship/call/[callId]/Rating";
import { useWebRTC } from "./hooks/useWebRTC";

interface PageProps {
  params: { callId: string };
}

const VideoCallPage = ({ params }: PageProps) => {
  const { user } = useUser();
  const { callId } = params;
  const router = useRouter();
  
  // State management
  const [isCallActive, setIsCallActive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [callEnded, setCallEnded] = useState(false);
  const [callDuration, setCallDuration] = useState(30 * 60); // Duration from API
  const [formData, setFormData] = useState({
    Role: "",
    mentorId: "",
    menteeId: "",
  });

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Custom hooks
  const {
    localRef,
    remoteRef,
    webcamActive,
    remoteStreamActive,
    setupSources,
    hangUp
  } = useWebRTC(callId);

  const {
    timeRemaining,
    showWarning,
    warningCountdown
  } = useCallTimer(callDuration, isCallActive, handleEndCall);

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

  async function handleEndCall() {
    console.log(formData.Role);
    
    if (formData.Role === "mentee") {
      setCallEnded(true);
    } else {
      router.push("/Mentor");
    }
    await hangUp(formData);
  }

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    // Add actual mute logic here if needed
  };

  useEffect(() => {
    const initializeCall = async () => {
      try {
        const res = await axios.get(`/api/booking?callId=${callId}`);
        console.log(res.data);
        
        const { data } = await axios.get(`/api/mentor/profile?userId=${user?.id}`);
        const userId = data.data.profile._id;
        
        let role: string;
        if (userId === res.data.data.mentorId) {
          role = "mentor";
        } else {
          role = "mentee";
        }

        // Set call duration from API response
        const apiDuration = parseInt(res.data.data.Duration) * 60; // Convert minutes to seconds
        setCallDuration(apiDuration);

        setFormData({
          Role: role,
          mentorId: res.data.data.mentorId,
          menteeId: res.data.data.menteeId,
        });
        
        await setupSources(role);
      } catch (error) {
        console.error("Error initializing call:", error);
      }
    };

    if (user?.id) {
      initializeCall();
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      hangUp();
    };
  }, [callId, user?.id]);

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
      <VideoContainer
        localRef={localRef}
        remoteRef={remoteRef}
        webcamActive={webcamActive}
        remoteStreamActive={remoteStreamActive}
      />

      <CallTimer
        timeRemaining={timeRemaining}
        showControls={showControls}
      />

      <CallControls
        onEndCall={handleEndCall}
        onToggleMute={handleToggleMute}
        isMuted={isMuted}
        showControls={showControls}
      />

      {showWarning && (
        <CallWarning countdown={warningCountdown} />
      )}

      {callEnded && <RatingPage formData={formData} />}
    </div>
  );
};

export default VideoCallPage;