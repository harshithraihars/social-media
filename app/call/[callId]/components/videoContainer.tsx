import React from 'react';
import { Camera } from 'lucide-react';

interface VideoContainerProps {
  localRef: React.RefObject<HTMLVideoElement>;
  remoteRef: React.RefObject<HTMLVideoElement>;
  webcamActive: boolean;
  remoteStreamActive: boolean;
}

const VideoContainer: React.FC<VideoContainerProps> = ({
  localRef,
  remoteRef,
  webcamActive,
  remoteStreamActive
}) => {
  return (
    <>
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
                Waiting for video stream...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Local Video - Picture in Picture */}
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
    </>
  );
};

export default VideoContainer;