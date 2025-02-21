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
import Searchdiv from "./Searchdiv";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setisInput, setisLoading, setPosts, setSearching, setSearchUsers } from "@/lib/feature/todos/todoSlice";
import { getAllPost, getAllUsers } from "@/lib/serveractions";
import { useRouter } from "next/router";
import Link from "next/link";

const SearchInput = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const input = useAppSelector((state) => state.counter.input);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Handle focus and blur events
  const handleFocus = (): void => setIsFocused(true);
  const handleBlur = (): void => setIsFocused(false);

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
      setIsFocused(false);
      ref.current?.click();
      dispatch(setisLoading(true));
      const searchedUsers = await getAllUsers(input);
      const posts = await getAllPost(input);
      dispatch(setSearching(true));
      dispatch(setPosts(posts));
      dispatch(setSearchUsers(searchedUsers));
      dispatch(setisLoading(false));
    }
  };

  return (
    <div className="relative w-80">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Search"
        className="bg-[#EDF3F8] w-[260px] rounded-lg border-none outline-none"
        onFocus={handleFocus}
        // when focused outside looses the focus so conflict with the clicking logic
        // onBlur={handleBlur}
        value={input}
        onChange={(e) => dispatch(setisInput(e.target.value))}
        onKeyDown={handleKey}
      />
      <Link href={`/search/${input}`} className="hidden">
        <button ref={ref}></button>
      </Link>
      {/* Dropdown appearing below the search box */}
      {isFocused && (
        <div className="absolute w-full mt-1 z-10">
          <Searchdiv dropdownRef={dropdownRef} reference={ref} setIsFocused={setIsFocused} />
        </div>
      )}
    </div>
  );
};

export default SearchInput;
