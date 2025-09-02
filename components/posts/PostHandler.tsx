"use client";
import React, { useEffect, useRef, useState } from "react";
import Posts from "./Posts";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { IPost, IPostDocument } from "@/models/post.model";
import {
  addPost,
  postsSelectors,
  setAllPosts,
  setRequest,
  setSearchUsers,
} from "@/lib/feature/todos/todoSlice";
import PostLoader from "./PostLoader";
import { UserType } from "@/models/UserInfo";
import { getAllPost } from "@/lib/serverAction/postAction";
import { Loader2 } from "lucide-react";

const PostHandler = ({
  userConnections,
  requests,
  searchedUsers,
  searchQuery,
}: {
  userConnections: any;
  requests: any;
  searchedUsers?: UserType[] | undefined;
  searchQuery: string | undefined;
}) => {
  const dispatch = useAppDispatch();
  const allPosts = useAppSelector(postsSelectors.selectAll);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const isPostsLoaded = useAppSelector((state) => state.counter.isPostsLoaded);

  useEffect(() => {
    if (requests) dispatch(setRequest(requests));
    dispatch(setSearchUsers(searchedUsers));
  }, [dispatch, requests]);

  const loadPosts = async () => {
    if (!hasMore || loading) return;
    setLoading(true);

    const { posts, hasMore: more } = await getAllPost(page, 10, searchQuery);
    if (page === 1) {
      dispatch(setAllPosts(posts)); // first batch replaces nothing
    } else {
      posts.forEach((post: IPostDocument) => dispatch(addPost(post))); // append new posts
    }

    setHasMore(more);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    loadPosts(); // load first batch
  }, []);

  // Sets up an IntersectionObserver to watch the loader div.
  // When it enters view (near bottom), and if more posts exist + not loading, it fetches more posts.
  // Cleans up observer when component unmounts or deps change.

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadPosts();
        }
      },
      { threshold: 0.1, rootMargin: "100px" } // <-- important for mobile
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [hasMore, loading, loadPosts]);

  if (!isPostsLoaded) {
    return <PostLoader />;
  }

  if (allPosts.length === 0) {
    return (
      <div className="text-center text-muted-foreground mt-10 font-bold">
        No posts found.
      </div>
    );
  }
  return (
    <div>
      <Posts userConnections={userConnections} />
      <div ref={loaderRef} className="h-10" /> {/* always below posts */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-6">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">Loading more posts...</p>
        </div>
      )}
    </div>
  );
};

export default PostHandler;
