"use client"
import React, { useEffect, useState } from "react";
import "@/app/Mentor/css/Loader.css";

const ProfileFormSkeleton = () => {
  const loadingText = "Loading profile";
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isTyping) {
      // Typing effect - add one character at a time
      if (displayText.length < loadingText.length) {
        timer = setTimeout(() => {
          setDisplayText(loadingText.substring(0, displayText.length + 1));
        }, 60);
      } else {
        // Pause at full text before erasing
        timer = setTimeout(() => {
          setIsTyping(false);
        }, 1000);
      }
    } else {
      // Erasing effect - remove one character at a time from the end
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, 60);
      } else {
        // Pause when empty before starting again
        timer = setTimeout(() => {
          setIsTyping(true);
        }, 500);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isTyping, loadingText]);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <div className="dot-spinner">
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileFormSkeleton;
