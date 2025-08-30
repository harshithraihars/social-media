import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface CallWarningProps {
  countdown: number;
}

const CallWarning: React.FC<CallWarningProps> = ({ countdown }) => {
  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 sm:p-12 mx-4 max-w-md w-full text-center border border-gray-200 shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
            <AlertTriangle size={32} className="sm:w-10 sm:h-10 text-red-500" />
          </div>
        </div>
        
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
          Call Ending Soon
        </h3>
        
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Your call will end automatically in
        </p>
        
        <div className="text-6xl sm:text-7xl font-bold text-red-500 mb-6 font-mono animate-pulse">
          {countdown}
        </div>
        
        <p className="text-gray-500 text-sm">
          {countdown === 1 ? 'second' : 'seconds'}
        </p>
      </div>
    </div>
  );
};

export default CallWarning;