"use client";
import { UserResult } from "@/lib/feature/todos/todoSlice";
import { getAllUsers, searchUserSuggestions } from "@/lib/serverAction/userAction";
import { UserType } from "@/models/UserInfo";
import { useRouter } from "next/navigation";
import React, { RefObject, useEffect, useRef, useState } from "react";

interface ISuggetion{
  firstName: string; 
  lastName: string; 
  profilePhoto?: string
}
const Searchdiv = ({
  dropdownRef,
  setIsFocused,
  searchQuery,
  setsearchQuery,
}: {
  dropdownRef: RefObject<HTMLDivElement>;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  setsearchQuery:React.Dispatch<React.SetStateAction<string>>;
  searchQuery:string
}) => {
  const [suggestions, setSuggestions] = useState<ISuggetion[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const router=useRouter();
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(async () => {
      const results = await searchUserSuggestions(searchQuery);
      setSuggestions(results);
      setLoading(false);
    }, 500); // 500ms debounce
  }, [searchQuery]);

  // when clicked an option user gets naviageted to search page
  const handleClick = async (user:ISuggetion) => {
    setsearchQuery(user?.firstName+user.lastName);
    router.push(`/search/${user?.firstName+user.lastName}`)
    setIsFocused(false)
  };
  return (
    <div
  ref={dropdownRef}
  className="absolute left-0 right-0 mt-4 bg-white shadow-lg rounded-lg overflow-auto z-10 w-full md:w-96 h-fit px-2 pb-2"
>
  <ul className="divide-gray-200">
    <div className="flex items-center justify-between px-2 py-2">
      <p className="text-gray-500 text-sm">Recent</p>
      <p className="text-blue-500 text-sm cursor-pointer hover:underline">Clear</p>
    </div>

    {loading? (
      Array.from({ length: 4 }).map((_, idx) => (
        <li
          key={idx}
          className="flex items-center gap-3 p-3 animate-pulse bg-gray-100 rounded-lg mb-2 last:mb-0"
        >
          <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </li>
      ))
    ) : (
      suggestions.map((user, index) => (
        <li
          key={index}
          className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer rounded-lg mb-2 last:mb-0"
          onClick={() => handleClick(user)}
        >
          <img
            src={user.profilePhoto}
            alt={`${user.firstName}'s avatar`}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium">
            {user.firstName} {user.lastName}
          </span>
        </li>
      ))
    )}
  </ul>
</div>

  );
};

export default Searchdiv;
