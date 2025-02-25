"use client";
import React, { useEffect, useState } from "react";
import Mentee from "./pages/Mentee";
import MentorShipActivationCard from "./pages/MentorShipActivationCard";
import { motion, AnimatePresence } from "framer-motion";

const MentorshipPage = () => {
  const [isMentorView, setIsMentorView] = useState(false);
  useEffect(()=>{
    console.log(isMentorView);
    
  },[isMentorView])
  return (
    <div className="min-h-screen md:bg-[#fbf9f5] shadow-2xl mt-20">
      {/* Header Section */}
      <header className="shadow-sm rounded-t-[10px] relative">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          {/* Flex container to keep items in the same row */}
          <div className="flex flex-row flex-nowrap justify-between items-start sm:items-center w-full gap-4">
            {/* Left Section (Heading + Quote) */}
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Hi, Alex
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                "Growth begins at the end of your comfort zone"
              </p>
            </div>

            {/* Toggle Button (Always aligned with heading at the top) */}
            <button
              onClick={() => setIsMentorView(!isMentorView)}
              className="relative inline-flex h-8 w-36 items-center rounded-md overflow-hidden border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 self-start"
              aria-pressed={isMentorView}
              aria-label="Toggle view"
            >
              <span className="sr-only">
                {isMentorView
                  ? "Switch to Mentee view"
                  : "Switch to Mentor view"}
              </span>

              {/* Background */}
              <span
                className={`absolute inset-0 transition-colors duration-500 ease-in-out ${
                  isMentorView
                    ? "bg-indigo-600 shadow-[0_0_10px_rgba(99,102,241,0.6)]"
                    : "bg-gray-700"
                }`}
              />

              {/* Toggle handle */}
              <span
                className={`absolute h-6 w-16 rounded bg-white shadow-md transition-transform duration-500 ease-out ${
                  isMentorView ? "translate-x-20" : "translate-x-0"
                }`}
              />

              {/* Text labels */}
              <div className="absolute inset-0 flex items-center justify-between w-full px-3">
                <span
                  className={`text-xs font-medium ${
                    isMentorView
                      ? "text-white scale-105 font-semibold"
                      : "text-gray-400"
                  }`}
                >
                  Mentee
                </span>
                <span
                  className={`text-xs font-medium ${
                    isMentorView
                      ? "text-gray-400"
                      : "text-white scale-105 font-semibold"
                  }`}
                >
                  Mentor
                </span>
              </div>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence mode="popLayout">
        {isMentorView ? (
          <motion.div
            key="mentor"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            layout
          >
            <MentorShipActivationCard />
          </motion.div>
        ) : (
          <motion.div
            key="mentee"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            layout
          >
            <Mentee />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MentorshipPage;
