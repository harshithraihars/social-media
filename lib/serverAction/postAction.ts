"use server";

// export const revalidate=true
// import {v2 as cloudinary} from "next-cloudinary"
import { Post } from "@/models/post.model";
import { IUser, User } from "@/models/user.model";
import { currentUser } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import { Comment } from "@/models/comment.model";
import { UserType } from "@/models/UserInfo";
import { useUser } from "@clerk/nextjs";
import connectDB from "../db";
export const createPostAction = async (
  inputText: string,
  selectedFile: string
) => {
  await connectDB();
  const user = await currentUser();
  if (!user) {
    throw new Error("user not Authenticated");
  }
  if (!inputText) {
    throw new Error("input Field is Required");
  }
  const image = selectedFile;
  const userDatabase: IUser = {
    firstName: user.firstName || "harshith",
    lastName: user.lastName || "rai",
    userId: user.id,
    profilePhoto: user.imageUrl,
  };
  let uploadResponse;
  try {
    // post with image
    // without image
    let res;
    if (image) {
      uploadResponse = await cloudinary.uploader.upload(image);
      res = await Post.create({
        description: inputText,
        user: userDatabase,
        // image Url from cloudinary
        // imageUrl:image
        imageUrl: uploadResponse?.secure_url,
      });
    } else {
      res = await Post.create({
        description: inputText,
        user: userDatabase,
      });
    }
    // when you upload the path it should be visible in the ral time so you are playing with the cache
    return JSON.parse(JSON.stringify(res));
    revalidatePath("/");
  } catch (error) {
    // console.log(error.message);
    console.log(error);
  }
};

export const getAllPost = async (username = " ") => {
  try {
    await connectDB();
    // populated is used because the post contains _id of the commments from which you can populate the entire comment information
    // instead of storing it completely
    let posts;
    if (username === " ") {
      posts = await Post.find()
        .sort({ createdAt: -1 })
        .populate({ path: "comments", options: { sort: { createdAt: -1 } } });
    } else {
      const cuser = await currentUser();
      const regex = new RegExp(`^${username}`, "i");
      posts = await Post.find()
        .where({
          $and: [
            {
              $expr: {
                $regexMatch: {
                  input: {
                    $concat: ["$user.firstName", " ", "$user.lastName"],
                  },
                  regex,
                },
              },
            },
            { "user.userId": { $ne: cuser?.id } },
          ],
        })
        .sort({ createdAt: -1 })
        .populate({ path: "comments", options: { sort: { createdAt: -1 } } });
    }
    if (!posts) return [];
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.log(error);
  }
};

export const deletePostAction = async (postId: string) => {
  await connectDB();
  const user = await currentUser();
  if (!user) {
    throw new Error("User not Authonticated");
  }
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  } else {
    if (post.user.userId !== user.id) {
      throw new Error("You are not the owner of this post");
    }
    try {
      await post.deleteOne({ _id: postId });
      revalidatePath("/");
    } catch (error) {
      console.log(error);
    }
  }
};

export const createCommentAction = async (
  postId: string,
  formData: FormData
) => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("user not Authonticated");
    }
    const inputtext = formData.get("inputText") as string;
    if (!inputtext) throw new Error("message Field is Required");
    const userDatabase: IUser = {
      firstName: user.firstName || "harshith",
      lastName: user.lastName || "rai",
      userId: user.id,
      profilePhoto: user.imageUrl,
    };
    const post = await Post.findById({ _id: postId });
    if (!post) throw new Error("Post not Found");
    const comment = await Comment.create({
      textMessage: inputtext,
      user: userDatabase,
    });
    post.comments?.push(comment._id);
    await post.save();
    revalidatePath("/");
    return JSON.parse(JSON.stringify(comment));
  } catch (error) {
    throw new Error("Error ocuured" + error);
  }
};