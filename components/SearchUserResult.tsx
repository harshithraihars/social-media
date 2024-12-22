"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Send } from "lucide-react";
import { IUserDocument } from "@/models/user.model";
import { useAppSelector } from "@/lib/hooks";
import { UserResult } from "@/lib/feature/todos/todoSlice";
import { getCurrentUser, SendConnectionRequest } from "@/lib/serveractions";
import ProfilePhoto from "./shared/ProfilePhoto";

const SearchUserResult = () => {
  const { user } = useUser();
  const [currentUser, setcurrentUser] = useState<IUserDocument>();
  const [sentRequest, setSentRequset] = useState<string[] | null>([]);
  const searchedUsers = useAppSelector((state) => state.counter.searchResult);
  const handleUSerConnections = async (user: UserResult) => {
    const newRequest = sentRequest?.includes(user.userId)
      ? sentRequest.filter((request) => request !== user.userId)
      : [...sentRequest!, user.userId];
  
    setSentRequset(newRequest);
    await SendConnectionRequest(user.userId);
  };
  
  useEffect(() => {
    async function getUser() {
      const User = await getCurrentUser();
      // dispatch(setUser(User))
      setcurrentUser(User)
      const sentRequest = User.sentReqest?.map((user: { receiverId: any; }) => user.receiverId) || [];      
      setSentRequset(sentRequest);
    }
    getUser();
  }, [user]);
  return (
    <div className="w-full">
      {searchedUsers?.map((user, index) => (
        <div
          key={index}
          className="bg-white my-2 md:mx-0 rounded-lg flex justify-between items-center mb-4 hover:bg-gray-100 pr-6 w-full cursor-pointer py-3"
        >
          <div className=" flex gap-2 p-2">
            <ProfilePhoto src={user.profilePhoto} />
            <div className="flex items-center justify-between w-full">
              <div>
                <h1 className="text-sm font-bold">
                  {`${user.firstName} ${user.lastName}`}
                </h1>
                <p className="text-sm text-gray-600">{user.bio}</p>
              </div>
            </div>
          </div>
          <div className="" onClick={() => handleUSerConnections(user)}>
            <p
              className={`${currentUser?.connections?.includes(user.userId)?"":"border-2"} "border-blue-600" "border-gray-500" rounded-2xl px-2 py-1 text-blue-800 font-normal cursor-pointer`}
            >
              {currentUser?.connections?.includes(user.userId)?(
                <Send size={30}/>
              ):sentRequest?.includes(user.userId) ? "Pending" : "Connect"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchUserResult;