import { useState, useEffect, useRef } from 'react';

export const useCallTimer = (
  initialDuration: number,
  isCallActive: boolean,
  onCallEnd: () => void
) => {
  const [timeRemaining, setTimeRemaining] = useState(initialDuration);
  const [showWarning, setShowWarning] = useState(false);
  const [warningCountdown, setWarningCountdown] = useState(10);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const warningIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Update initial duration when it changes
  useEffect(() => {
    setTimeRemaining(initialDuration);
  }, [initialDuration]);

  // Main timer countdown
  useEffect(() => {
    if (!isCallActive) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeRemaining((prevTime) => {
        const newTime = prevTime - 1;
        
        // Show warning when 10 seconds remaining
        if (newTime === 10) {
          setShowWarning(true);
          setWarningCountdown(10);
          
          // Start warning countdown
          let countdown = 10;
          warningIntervalRef.current = setInterval(() => {
            countdown -= 1;
            setWarningCountdown(countdown);
            
            if (countdown <= 0) {
              if (warningIntervalRef.current) {
                clearInterval(warningIntervalRef.current);
              }
            }
          }, 1000);
        }
        
        // End call when time reaches 0
        if (newTime <= 0) {
          onCallEnd();
          return 0;
        }
        
        return newTime;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (warningIntervalRef.current) {
        clearInterval(warningIntervalRef.current);
      }
    };
  }, [isCallActive, onCallEnd]);

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (warningIntervalRef.current) {
        clearInterval(warningIntervalRef.current);
      }
    };
  }, []);

  return {
    timeRemaining,
    showWarning,
    warningCountdown
  };
};