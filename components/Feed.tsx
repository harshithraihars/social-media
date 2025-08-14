// import React from 'react'
// import PostInput from './PostInput'
// import Posts from './Posts'
// import { getAllPosts } from '@/lib/serveractions';
// import PostHandler from './PostHandler';

// const Feed = async ({user,userInfo}:{user:any,userInfo:any}) => {
//     const userData = JSON.parse(JSON.stringify(user));
//     const posts = await getAllPosts();
//     let userInfoClient;
//     if(userInfo){
//       userInfoClient=JSON.parse(JSON.stringify(userInfo))
//     }
//     const parsedPosts=JSON.parse(JSON.stringify(posts))
//   return (
//     <div className='flex-1'>
//         <PostInput user={userData}/>
//         <PostHandler posts = {parsedPosts!} userInfo={userInfoClient}/>

//     </div>
//   )
// }

// export default Feed
import React from "react";
import PostInput from "./PostInput";
import PostHandler from "./PostHandler";
import SearchResult from "./SearchResult";
import { getAllPost } from "@/lib/serverAction/postAction";
import { useAppSelector } from "@/lib/hooks";
import {
  getAllRequests,
  getAllUsers,
  handleUSerConnections,
} from "@/lib/serverAction/userAction";
const Feed = async ({ searchQuery }: { searchQuery?: string }) => {
  // you cant send plain object from server to client
  // const userData=JSON.parse(JSON.stringify(user))
    
  const userInfo = await handleUSerConnections();
  const posts = await getAllPost(searchQuery);
  const requests = await getAllRequests();
  const searchedUsers = await getAllUsers(searchQuery);
      
  
  return (
    <div className="flex-1">
      <SearchResult />
      <PostInput />
      <PostHandler
        posts={posts?JSON.parse(JSON.stringify(posts)):null}
        userConnections={JSON.parse(JSON.stringify(userInfo))}
        requests={JSON.parse(JSON.stringify(requests))}
        searchedUsers={searchedUsers}
      />
      {/* <Posts posts={posts} userInfo={userInfo}/> */}
    </div>
  );
};

export default Feed;
