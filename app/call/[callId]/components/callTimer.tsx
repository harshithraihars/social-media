import React from 'react';

interface CallTimerProps {
  timeRemaining: number;
  showControls: boolean;
}

const CallTimer: React.FC<CallTimerProps> = ({ timeRemaining, showControls }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      className={`absolute top-4 left-4 sm:top-6 sm:left-6 bg-white/80 backdrop-blur-md text-gray-800 px-3 py-2 sm:px-5 sm:py-3 rounded-xl font-mono text-base sm:text-xl border border-gray-200 shadow-lg transition-opacity duration-300 ${
        showControls ? "opacity-100" : "opacity-0"
      }`}
    >
      {formatTime(timeRemaining)}
    </div>
  );
};

export default CallTimer;