"use client"
import React, { useState, useEffect, useRef } from 'react';
import { PhoneOff, Mic, MicOff, Video, VideoOff, Camera } from 'lucide-react';

const VideoCallPage = () => {
  const [isCallActive, setIsCallActive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  
  const controlsTimeoutRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(duration => duration + 1);
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
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle mouse movement to show/hide controls
  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  // Simulate camera access (in real app, you'd use getUserMedia)
  useEffect(() => {
    const startLocalVideo = async () => {
      try {
        // In a real app, you would use:
        // const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        // if (localVideoRef.current) {
        //   localVideoRef.current.srcObject = stream;
        // }
        
        // For demo purposes, we'll just show placeholder content
        console.log('Video call initialized');
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    if (isCallActive) {
      startLocalVideo();
    }
  }, [isCallActive]);

  const handleEndCall = () => {
    setIsCallActive(false);
    // In real app, you'd clean up streams and connections here
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // In real app, you'd mute/unmute the audio track
  };

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    // In real app, you'd enable/disable the video track
  };

  return (
    <div 
      className="relative w-full h-screen bg-black overflow-hidden cursor-none"
      onMouseMove={handleMouseMove}
      style={{ cursor: showControls ? 'default' : 'none' }}
    >
      {/* Remote Video - Full Screen Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={remoteVideoRef}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          muted={false}
        />
        {/* Placeholder for remote video when no stream */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm border border-white/30">
              <Camera size={48} className="text-white" />
            </div>
            <h2 className="text-2xl font-semibold mb-2 drop-shadow-lg">Remote Participant</h2>
            <p className="text-white/90 drop-shadow">Waiting for video stream...</p>
          </div>
        </div>
      </div>

      {/* Local Video - Picture in Picture (Bottom Right) */}
      <div className="absolute bottom-6 right-6 w-72 h-52 bg-gray-800 rounded-lg overflow-hidden border-2 border-white/20 shadow-2xl">
        <video
          ref={localVideoRef}
          className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : ''}`}
          autoPlay
          playsInline
          muted
        />
        {/* Placeholder for local video */}
        <div className={`absolute inset-0 bg-gradient-to-br from-blue-300 to-blue-400 flex items-center justify-center ${isVideoOff ? '' : 'hidden'}`}>
          <div className="text-center text-white">
            <div className="w-12 h-12 bg-white/25 rounded-full flex items-center justify-center mb-2 mx-auto border border-white/30">
              <Camera size={20} className="text-white" />
            </div>
            <p className="text-xs text-white font-medium drop-shadow">You</p>
          </div>
        </div>
        {/* Video off overlay */}
        {isVideoOff && (
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
            <VideoOff size={24} className="text-white/60" />
          </div>
        )}
      </div>

      {/* Timer Display */}
      <div className={`absolute top-6 left-6 bg-black/40 backdrop-blur-md text-white px-5 py-3 rounded-xl font-mono text-xl border border-white/20 shadow-lg transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        {formatTime(callDuration)}
      </div>

      {/* Call Controls */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-6 transition-all duration-300 ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg backdrop-blur-md border-2 ${
            isMuted 
              ? 'bg-red-500/90 hover:bg-red-600/90 border-red-400/50' 
              : 'bg-white/20 hover:bg-white/30 border-white/30'
          }`}
        >
          {isMuted ? (
            <MicOff size={28} className="text-white drop-shadow" />
          ) : (
            <Mic size={28} className="text-white drop-shadow" />
          )}
        </button>

        {/* End Call Button */}
        <button
          onClick={handleEndCall}
          className="w-20 h-20 bg-red-500/90 hover:bg-red-600/90 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-105 shadow-xl backdrop-blur-md border-2 border-red-400/50"
        >
          <PhoneOff size={32} className="text-white drop-shadow" />
        </button>

        {/* Video Toggle Button */}
        <button
          onClick={toggleVideo}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg backdrop-blur-md border-2 ${
            isVideoOff 
              ? 'bg-red-500/90 hover:bg-red-600/90 border-red-400/50' 
              : 'bg-white/20 hover:bg-white/30 border-white/30'
          }`}
        >
          {isVideoOff ? (
            <VideoOff size={28} className="text-white drop-shadow" />
          ) : (
            <Video size={28} className="text-white drop-shadow" />
          )}
        </button>
      </div>

      {/* Call Ended Overlay */}
      {!isCallActive && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-6 mx-auto">
              <PhoneOff size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-semibold mb-2">Call Ended</h2>
            <p className="text-white/70 mb-4">Call duration: {formatTime(callDuration)}</p>
            <button
              onClick={() => {
                setIsCallActive(true);
                setCallDuration(0);
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Start New Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCallPage;