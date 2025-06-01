import React from "react";

interface CallTimerProps {
  callDuration: number;
  showControls: boolean;
}

const CallTimer = ({ callDuration, showControls }: CallTimerProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      className={`absolute top-4 left-4 sm:top-6 sm:left-6 transition-all duration-300 ${
        showControls ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="bg-gradient-to-r from-white/85 to-gray-50/85 backdrop-blur-lg px-4 py-3 sm:px-5 sm:py-3 rounded-2xl border border-gray-200/50 shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <div className="font-mono text-base sm:text-xl text-gray-700 tracking-wide">
            {formatTime(callDuration)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallTimer;