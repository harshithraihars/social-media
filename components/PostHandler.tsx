"use client";
import React, { useEffect } from "react";
import Posts from "./Posts";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { IPostDocument } from "@/models/post.model";
import {
  postsSelectors,
  setAllPosts,
  setRequest,
  setSearchUsers,
} from "@/lib/feature/todos/todoSlice";
import PostLoader from "./PostLoader";
import { UserType } from "@/models/UserInfo";

const PostHandler = ({
  posts,
  userConnections,
  requests,
  searchedUsers
}: {
  posts: IPostDocument[] | null;
  userConnections: any;
  requests: any;
  searchedUsers?:UserType[]|undefined
}) => {
  // const dispatch=useAppDispatch()

  const allPosts = useAppSelector(postsSelectors.selectAll);

  const isPostsLoaded=useAppSelector((state)=>state.counter.isPostsLoaded)
  // // if (allPosts.length === 0) {
  // //     dispatch(setAllPosts(posts)); // posts: IPostDocument[]
  // // }

  // useEffect(()=>{
  //   async function handleData() {
  //         dispatch(setRequest(requests));
  //         dispatch(setAllPosts(posts))
  //       }
  //       handleData();
  // },[posts])

  const dispatch = useAppDispatch();

  useEffect(() => {
    if(requests) dispatch(setRequest(requests));
    if(posts) dispatch(setAllPosts(posts));
    dispatch(setSearchUsers(searchedUsers))
  }, [dispatch, requests, posts]);

  if (!isPostsLoaded) {
  return <PostLoader />; 
}
if (allPosts.length === 0) {
  return (
    <div className="text-center text-muted-foreground mt-10 font-bold">
      No posts found.
    </div>
  ); // ✅ Empty state
}
  return (
    <div>
      <Posts userConnections={userConnections} />
    </div>
  );
};

export default PostHandler;
