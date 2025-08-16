"use client";
import { useAppSelector } from "@/lib/hooks";
import React, { useEffect } from "react";
import SearchUserResult from "./SearchUserResult";
import { usePathname } from "next/navigation";


const SearchResult = () => {
    const isSearching = usePathname().startsWith("/search")
  
    return (
      <div>
        {isSearching ? (
          <div className="border-gray-300">
            <div className="flex items-start flex-col bg-white p-4 md:m-0 border rounded-lg">
              <h2 className="font-normal mb-2 text-2xl text-gray-800 ml-4">People</h2>
              <div className="flex justify-start items-center gap-3">
              </div>
              {/* Thin line separator */}
              <div className="relative w-full my-2">
                <div className="absolute left-0 w-3/4 border-t border-gray-300"></div>
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