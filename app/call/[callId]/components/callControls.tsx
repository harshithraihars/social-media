import React from 'react';
import { PhoneOff, Mic, MicOff, Video } from 'lucide-react';

interface CallControlsProps {
  onEndCall: () => void;
  onToggleMute: () => void;
  isMuted: boolean;
  showControls: boolean;
}

const CallControls: React.FC<CallControlsProps> = ({
  onEndCall,
  onToggleMute,
  isMuted,
  showControls
}) => {
  return (
    <div
      className={`absolute bottom-28 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 sm:space-x-6 transition-all duration-300 ${
        showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <button
        onClick={onToggleMute}
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
        onClick={onEndCall}
        className="w-16 h-16 sm:w-20 sm:h-20 bg-red-500/90 hover:bg-red-600/90 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-105 shadow-xl backdrop-blur-md border-2 border-red-400/50"
      >
        <PhoneOff size={24} className="sm:w-8 sm:h-8 text-white" />
      </button>

      <button className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg backdrop-blur-md border-2 bg-white/80 hover:bg-white/90 border-gray-200/50">
        <Video size={20} className="sm:w-7 sm:h-7 text-gray-700" />
      </button>
    </div>
  );
};

export default CallControls;