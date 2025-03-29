// app/loading-page/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

export default function LoadingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Loading your experience");
  const [dots, setDots] = useState('');
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Animated dots
    const dotInterval = setInterval(() => {
      setDots(prev => prev.length < 3 ? prev + '.' : '');
    }, 500);

    // Fake progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        // Slow down progress as it approaches 100%
        const increment = Math.max(1, Math.floor((100 - prev) / 10));
        const newProgress = Math.min(99, prev + increment);
        return newProgress;
      });
    }, 300);
    
    // Simulate different loading messages
    const messages = [
      "Loading your experience",
      "Preparing your dashboard",
      "Almost there",
      "Just a moment"
    ];
    
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setLoadingMessage(messages[messageIndex]);
    }, 3000);
    
    // Simulate content loading after 8 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 8000);
    
    return () => {
      clearInterval(dotInterval);
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearTimeout(timer);
    };
  }, []);
  
  // Loading state component
  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="flex flex-col items-center max-w-md text-center">
        {/* Spinner */}
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-gray-200 border-t-indigo-500 animate-spin"></div>
        </div>
        
        {/* Loading Message */}
        <h2 className="text-2xl font-medium text-gray-800 mb-6 min-h-8">
          {loadingMessage}{dots}
        </h2>
        
        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-indigo-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Progress Percentage */}
        <p className="text-sm text-gray-600">
          {progress}%
        </p>
      </div>
    </div>
  );
  
  // Loaded state component
  const LoadedState = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to the Application
      </h1>
      
      <p className="text-xl text-gray-600 mb-8 max-w-md">
        Your content is now loaded and ready to use.
      </p>
      
      <button 
        onClick={() => setIsLoading(true)}
        className="px-6 py-3 bg-indigo-500 text-white font-medium rounded-lg transition-colors duration-300 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        Show Loading Screen Again
      </button>
    </div>
  );
  
  return isLoading ? <LoadingState /> : <LoadedState />;
}