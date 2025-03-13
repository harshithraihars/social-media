"use client"
import { setMentee } from "@/lib/feature/todos/todoSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";

const MentorShipHeader = () => {
    const dispatch=useAppDispatch();
    const isMentorView=useAppSelector((state)=>state.counter.isMentor)
  return (
    <div>
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
              onClick={() => dispatch(setMentee(!isMentorView))}
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
    </div>
  );
};

export default MentorShipHeader;
