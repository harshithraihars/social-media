"use client";
import { useAppSelector } from "@/lib/hooks";
import React, { useEffect } from "react";
import SearchUserResult from "./SearchUserResult";


const SearchResult = () => {
    const isSearching = useAppSelector((state) => state.counter.isSearching);
    const options = ["1st", "2nd", "3rd+", "Actively hiring"];
  
    return (
      <div>
        {isSearching ? (
          <div className="border-gray-300">
            <div className="flex items-start flex-col bg-white p-4 md:m-0 border rounded-lg">
              <h2 className="font-normal mb-2 text-2xl text-gray-800">People</h2>
              <div className="flex justify-start items-center gap-3">
                {options.map((option, index) => (
                  <p
                    key={index}
                    className="border border-gray-300 px-2 py-1 rounded-2xl font-medium hover:border-gray-500 cursor-pointer"
                  >
                    {option}
                  </p>
                ))}
              </div>
              {/* Thin line separator */}
              <div className="relative w-full my-2">
                <div className="absolute left-1/4 w-3/4 border-t border-gray-300"></div>
              </div>
              <SearchUserResult/>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };
  
  export default SearchResult;