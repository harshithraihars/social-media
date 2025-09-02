import React from "react";
import SearchResult from "../search/SearchResult";
import { getAllPost } from "@/lib/serverAction/postAction";
import { useAppSelector } from "@/lib/hooks";
import {
  getAllRequests,
  getAllUsers,
  handleUSerConnections,
} from "@/lib/serverAction/userAction";
import PostInput from "../posts/PostInput";
import PostHandler from "../posts/PostHandler";
const Feed = async ({ searchQuery }: { searchQuery?: string }) => {
    
  const userInfo = await handleUSerConnections();
  const requests = await getAllRequests();
  const searchedUsers = await getAllUsers(searchQuery);
      
  
  return (
    <div className="flex-1">
      <SearchResult />
      <PostInput />
      <PostHandler
        userConnections={userInfo?JSON.parse(JSON.stringify(userInfo)):null}
        requests={requests?JSON.parse(JSON.stringify(requests)):null}
        searchedUsers={searchedUsers}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default Feed;
