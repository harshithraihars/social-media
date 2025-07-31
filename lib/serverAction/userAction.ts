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
import { POST } from "@/app/api/posts/[postId]/dislike/route";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
// creating the post

//get all post using server action

export const getAllUsers = async (username = " ") => {
  try {
    await connectDB();
    const user = await currentUser();
    let users: UserType[];
    if (username === " ") {
      users = await User.find({ userId: { $ne: user?.id } }).select(
        "firstName lastName userId profilePhoto _id"
      );
    } else {
      const regex = new RegExp(`^${username}`, "i"); // `i` makes it case-insensitive

      // Query the database
      users = await User.find({
        $expr: {
          $regexMatch: {
            input: { $concat: ["$firstName", " ", "$lastName"] }, // Combine firstName and lastName
            regex: regex,
          },
        },
        userId: { $ne: user?.id },
      }).select("firstName lastName userId profilePhoto _id bio");
    }
    if (!users || users.length === 0) {
      throw new Error("No user found");
    }
    const mappedUsers = users.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      profilePhoto: user.profilePhoto,
      userId: user.userId,
      _id: user._id.toString(), // Ensure _id is included and converted to string
      bio: user.bio,
    }));

    return mappedUsers;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export async function handleUSerConnections() {
  try {
    await connectDB();
    const user = await currentUser();
    if (!user) return;

    const userPresent = await User.findOne({ userId: user.id }).lean();

    if (!userPresent) {
      const firstName = user.firstName;
      const lastName = user.lastName;
      const userId = user.id;
      const profilePhoto = user.imageUrl;
      await User.create({
        firstName: firstName,
        lastName: lastName,
        userId: userId,
        profilePhoto: profilePhoto,
      });
      return;
    }
    return userPresent;
  } catch (error) {
    console.log(error);
  }
}

export async function createUserIfNotExists() {
  try {
    console.log("getting called");

    await connectDB();
    const user = await currentUser();
    if (!user) {
      throw new Error("UnAuthorized Access");
    }
    const existingUser = await User.findOne({ userId: user?.id });
    if (!existingUser) {
      const registeredUser = await User.create({
        firstName: user.firstName,
        lastName: user.lastName,
        userId: user.id,
        profilePhoto: user.imageUrl,
      });
      console.log(registeredUser);

      return JSON.parse(JSON.stringify(registeredUser));
    }

    return JSON.parse(JSON.stringify(existingUser));
  } catch (error) {
    console.log(error.messsage);

    console.log(error);
  }
}

export async function handleFollowing(userId: string) {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("user not Authenticated");
    }
    await connectDB();
    const userInfo = await User.findOne({ userId: user.id });
    if (!userInfo) {
      throw new Error("User not Authenticated");
    }
    if (userInfo.following?.includes(userId)) {
      await userInfo.updateOne({ $pull: { following: userId } });
    } else {
      await userInfo.updateOne({ $addToSet: { following: userId } });
    }
    revalidatePath("/");
    return;
  } catch (error) {
    console.log(error);
  }
}

export async function SendConnectionRequest(userId: string) {
  try {
    // Connect to the database
    await connectDB();

    // Get the current authenticated user
    const currentuser = await currentUser();
    if (!currentuser) throw new Error("User not authenticated");

    // Fetch the current user and the requested user
    const [user, requestedUser] = await Promise.all([
      User.findOne({ userId: currentuser.id }),
      User.findOne({ userId }),
    ]);

    if (!user) throw new Error("Current user does not exist");
    if (!requestedUser) throw new Error("Requested user does not exist");

    // Check if the request already exists in the `sentRequest` array
    const alreadySent = user.sentReqest?.some(
      (req) => req.receiverId === userId
    );
    const alreadyReceived = requestedUser.requests?.some(
      (req) => req.receiverId === currentuser.id
    );

    // Define actions for the current user and the requested user
    const userAction = alreadySent
      ? { $pull: { sentReqest: { receiverId: userId } } }
      : {
          $addToSet: { sentReqest: { receiverId: userId, sentAt: new Date() } },
        };

    const requestedUserAction = alreadyReceived
      ? { $pull: { requests: { receiverId: currentuser.id } } }
      : {
          $addToSet: {
            requests: { receiverId: currentuser.id, sentAt: new Date() },
          },
        };

    // Update both users in parallel
    await Promise.all([
      user.updateOne(userAction),
      requestedUser.updateOne(requestedUserAction),
    ]);
  } catch (error) {
    console.log("Error sending connection request:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}

export async function getCurrentUser() {
  try {
    await connectDB();
    const clerkUser = await currentUser();

    if (!clerkUser?.id) return;

    const user = await User.findOne({ userId: clerkUser?.id }); // Returns a plain object
    if (!user) {
      throw new Error("User does not exist");
    }

    return JSON.parse(JSON.stringify(user)); // Plain object
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAllRequests() {
  try {
    const currentuser = await currentUser();
    await connectDB();

    if (!currentuser) return

    // Find the user and populate only the required fields
    const user = await User.findOne({ userId: currentuser.id })
      .populate({
        path: "requestsDetails",
        select: "firstName lastName profilePhoto userId _id bio",
      })
      .lean();

    if (!user) {
      throw new Error("User does not exist");
    }

    const requestsWithDetails = user.requests
      ?.map((request) => {
        const receiverDetails = user.requestsDetails?.find(
          (detail) => detail.userId === request.receiverId
        );

        if (!receiverDetails) return null; // Handle missing details safely

        return {
          firstName: receiverDetails.firstName,
          lastName: receiverDetails.lastName,
          profilePhoto: receiverDetails.profilePhoto,
          userId: receiverDetails.userId,
          bio: receiverDetails.bio,
          sentAt: request.sentAt.toISOString(),
        };
      })
      .filter(Boolean); // Remove null values

    return requestsWithDetails;
  } catch (error) {
    throw new Error("Error Encountered")
    return []
  }
}

export async function RequestHandler(check: boolean, userId: string) {
  try {
    const currentuser = await currentUser();
    await connectDB();

    if (!currentuser) throw new Error("User not authenticated");

    // Find the current user and the requested user
    const user = await User.findOne({ userId: currentuser.id });
    const requestedUser = await User.findOne({ userId });

    if (!user || !requestedUser) {
      throw new Error("User does not exist");
    }

    if (check) {
      // Accept the request
      await user.updateOne({
        $pull: { requests: { receiverId: userId } }, // Remove from requests array
        $addToSet: { connections: userId }, // Add to connections
      });

      await requestedUser.updateOne({
        $pull: { sentReqest: { receiverId: currentuser.id } }, // Remove from sentReqest array
        $addToSet: { connections: currentuser.id }, // Add to connections
      });
    } else {
      // Reject the request
      await user.updateOne({
        $pull: { requests: { receiverId: userId } }, // Remove from requests array
      });
    }
    // revalidatePath("/")
  } catch (error) {
    console.log(error);
    throw error; // Re-throw error for the caller to handle
  }
}