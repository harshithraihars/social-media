"use client";
import React, { useState } from "react";
import Mentee from "./pages/Mentee";

const MentorshipPage = () => {
  const [isMentorView, setIsMentorView] = useState(false);
  const [isMentee,setIsmentee]=useState(true);

  return (
    <div className="min-h-screen md:bg-[#fbf9f5] shadow-2xl mt-20">
      {/* Header Section */}
      <header className="shadow-sm rounded-t-[10px] relative">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Left Section */}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Hi, Alex
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                "Growth begins at the end of your comfort zone"
              </p>
            </div>
          </div>

          {/* Enhanced Toggle Switch (Top-Right) */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => setIsMentorView(false)}
              className={`px-4 sm:px-6 py-1 sm:py-2 rounded-lg transition-all duration-300 ${
                !isMentorView
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800 bg-gray-200"
              }`}
            >
              Mentee
            </button>
            <button
              onClick={() => setIsMentorView(true)}
              className={`px-4 sm:px-6 py-1 sm:py-2 rounded-lg transition-all duration-300 ${
                isMentorView
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800 bg-gray-200"
              }`}
            >
              Mentor
            </button>
          </div>
        </div>
      </header>
      <Mentee/>
    </div>
  );
};

export default MentorshipPage;
