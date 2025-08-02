"use client";
import React, { useRef } from "react";
import ProfilePhoto from "./shared/ProfilePhoto";
import { useUser } from "@clerk/nextjs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { IComment } from "@/models/comment.model";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  postsSelectors,
  updatePost,
} from "@/lib/feature/todos/todoSlice";
import { createCommentAction } from "@/lib/serverAction/postAction";

const CommentInput = ({ postId }: { postId: string }) => {
  const { user } = useUser();
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) =>
    postsSelectors.selectById(state, postId)
  );
  const commentActionHandler = async (formData: FormData) => {
    try {
      if (!user) throw new Error("User not authenticated");
      const data = await createCommentAction(postId, formData);
      inputRef.current ? (inputRef.current.value = "") : "";

      dispatch(
        updatePost({
          id: postId,
          changes: {
            comments: [data, ...(post.comments || [])],
          },
        })
      );
    } catch (error) {
      throw new Error("An error occured");
    }
  };
  return (
    <form
      action={(formData) => {
        const promise = commentActionHandler(formData);
        toast.promise(promise, {
          loading: "Adding comment...",
          success: "Comment added",
          error: "Failed to add comment",
        });
      }}
    >
      <div className="flex items-center gap-2">
        <ProfilePhoto src={user?.imageUrl!} />
        <Input
          type="text"
          name="inputText"
          placeholder="Add a comment"
          className="rounded-full"
          ref={inputRef}
        />
        <Button type="submit" variant={"outline"} className="rounded-full">
          Send
        </Button>
      </div>
    </form>
  );
};

export default CommentInput;
