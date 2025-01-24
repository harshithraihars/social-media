"use client";
import { setisInput, setisLoading } from "@/lib/feature/todos/todoSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { handleSearch } from "@/lib/SearchHandler";
import { getAllUsers } from "@/lib/serveractions";
import { UserType } from "@/models/UserInfo";
import { stat } from "fs";
import { Clock } from "lucide-react";
import { ObjectId } from "mongoose";
import React, { RefObject, useEffect, useState } from "react";

const Searchdiv = ({
  dropdownRef,
  reference,
  setIsFocused,
}: {
  dropdownRef: RefObject<HTMLDivElement>;
  reference: RefObject<HTMLButtonElement>;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [suggestions, setSuggestions] = useState<UserType[]>([]); // Suggestions are now User[]
  const [users, setUsers] = useState<UserType[]>([]);
  const input=useAppSelector((state)=>state.counter.input)
  // Fetch users on component mount
  //   getting all users
  useEffect(() => {
    async function getUsers() {
      let userData = await getAllUsers();
      setUsers(userData);
    }
    getUsers();
  }, []);

  //   dynamicallygive suggetions based on the users input
  useEffect(() => {
    const newSuggestions = users.filter((user) =>
      (
        user.firstName.toLowerCase() +
        " " +
        user.lastName.toLowerCase()
      ).startsWith(input.toLowerCase())
    );
    setSuggestions(newSuggestions);
  }, [input, users]);
  const dispatch = useAppDispatch();


   interface UserInterface {
    firstName: string;
    lastName: string;
    userId: string;
    profilePhoto: string;
    _id:string;
    bio?: string;
  }
  // yet tpo complete when i clci on the option not properly navigating to the page
  const handleClick = async (user:UserInterface) => {
    console.log(user);
    setIsFocused(false);
    dispatch(setisLoading(true));
    dispatch(setisInput(user.firstName + " " + user.lastName));
    reference.current?.click();
    await handleSearch(user.firstName + " " + user.lastName, dispatch);
    dispatch(setisLoading(false));
  };
  return (
    <div
      ref={dropdownRef}
      className="absolute left-0 right-0 mt-4 bg-white shadow-lg rounded-lg overflow-auto z-10 w-full md:w-96 h-fit"
    >
      <ul className=" divide-gray-200">
        <div className="flex items-center justify-between px-4 py-2">
          <p>Recent</p>
          <p className="hover:cursor-pointer">clear</p>
        </div>
        {suggestions.map((user, index) => (
          <li
            key={index}
            className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer"
            onClick={()=>handleClick(user)}
          >
            <Clock size={20} className="text-gray-600" />
            {/* Icon removed due to import issues */}
            <span>
              {user.firstName} {user.lastName}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Searchdiv;
