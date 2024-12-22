"use client";
import { useAppSelector } from "@/lib/hooks";
import React from "react";

const SearchOptions = () => {
  const isSearching = useAppSelector((state) => state.counter.isSearching);
  const options = [
    "People",
    "Posts",
    "Companies",
    "Jobs",
    "Products",
    "Groups",
    "Services",
    "Events",
    "Courses",
    "Schools",
    "All Filters",
  ];

  return (
    <div>
      {isSearching && (
        <div className="fixed top-14 z-10 bg-white w-full px-4 py-2 overflow-x-auto shadow-[0_4px_10px_rgba(0,0,0,0.3)] border-none">
          <div className="flex flex-nowrap gap-4 justify-start sm:justify-center">
            {options.map((option, index) => (
              <div
                key={index}
                className="px-4 py-2 border border-gray-200 rounded-full text-center cursor-pointer transition-colors hover:border-gray-500 whitespace-nowrap"
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchOptions;