// import React from 'react'
// import { Input } from './ui/input'

// const SearchInput = () => {
//   return (
//     <div>
//         <Input
//         type="text"
//         placeholder="Search"
//         className="bg-[#EDF3F8] w-80 rounded-lg border-none"
//         />
//     </div>
//   )
// }

// export default SearchInput
"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import Searchdiv from "../layout/Searchdiv";
import { usePathname, useRouter } from "next/navigation";

const SearchInput = () => {
  const router = useRouter();

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [searchQuery, setsearchQuery] = useState<string>("");

  // Handle focus and blur events
  const handleFocus = (): void => setIsFocused(true);

  const pathname = usePathname();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKey = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // remove spaces present in between
      const normalizedQuery = searchQuery.trim().replace(/\s+/g, "");
      router.push(`/search/${normalizedQuery}`);
      setIsFocused(false);
    }
  };

  // remove the search query when not in the search page
  useEffect(() => {
    if (!pathname.startsWith("/search")) {
      setsearchQuery("");
    }
  }, [pathname]);

  return (
    <div className="relative w-80">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Search"
        className="bg-[#EDF3F8] w-[225px] md:w-[260px] rounded-lg border-none outline-none"
        onFocus={handleFocus}
        // when focused outside looses the focus so conflict with the clicking logic
        // onBlur={handleBlur}
        value={searchQuery}
        onChange={(e) => {
          setsearchQuery(e.target.value);
        }}
        onKeyDown={handleKey}
      />
      {/* Dropdown appearing below the search box */}
      {isFocused && (
        <div className="absolute w-full mt-1 z-10">
          <Searchdiv
            dropdownRef={dropdownRef}
            setIsFocused={setIsFocused}
            searchQuery={searchQuery}
            setsearchQuery={setsearchQuery}
          />
        </div>
      )}
    </div>
  );
};

export default SearchInput;
