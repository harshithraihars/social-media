// "use server"

// import { Post } from "@/models/post.model";
// import { IUser, User } from "@/models/user.model";
// import { currentUser } from "@clerk/nextjs/server"
// import { v2 as cloudinary } from 'cloudinary';
// import connectDB from "./db";
// import { revalidatePath } from "next/cache";
// import { Comment } from "@/models/comment.model";

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET
// });

// // creating post using server actions
// export const createPostAction = async (inputText: string, selectedFile: string) => {
//     await connectDB();
//     const user = await currentUser();
//     if (!user) throw new Error('User not athenticated');
//     if (!inputText) throw new Error('Input field is required');

//     const image = selectedFile;


//     const userDatabase: IUser = {
//         firstName: user.firstName || "Patel",
//         lastName: user.lastName || "Mern Stack",
//         userId: user.id,
//         profilePhoto: user.imageUrl
//     }
//     let uploadResponse;
//     try {
//         if (image) {
//             //1. create post with image
//             uploadResponse = await cloudinary.uploader.upload(image);
//             await Post.create({
//                 description: inputText,
//                 user: userDatabase,
//                 imageUrl: uploadResponse?.secure_url // yha pr image url ayega from cloudinary
//             })
//         } else {
//             //2. create post with text only
//             await Post.create({
//                 description: inputText,
//                 user: userDatabase
//             })
//         }
//         revalidatePath("/");
//     } catch (error: any) {
//         throw new Error(error);
//     }
// }
// // get all post using server actions
// export const getAllPosts = async () => {
//     try {
//         await connectDB();
//         const posts = await Post.find().sort({ createdAt: -1 }).populate({ path: 'comments', options: { sort: { createdAt: -1 } } });
//         if(!posts) return [];
//         return JSON.parse(JSON.stringify(posts));
//     } catch (error) {
//         console.log(error);
//     }
// }

// // delete post by id
// export const deletePostAction = async (postId: string) => {
//     await connectDB();
//     const user = await currentUser();
//     if (!user) throw new Error('User not authenticated.');
//     const post = await Post.findById(postId);
//     if (!post) throw new Error('Post not found.');

//     // keval apni hi post delete kr payega.
//     if (post.user.userId !== user.id) {
//         throw new Error('You are not an owner of this Post.');
//     }
//     try {
//         await Post.deleteOne({ _id: postId });
//         revalidatePath("/");
//     } catch (error: any) {
//         throw new Error('An error occurred', error);
//     }
// }

// export const createCommentAction = async (postId: string, formData: FormData) => {
//     try {
//         const user = await currentUser();
//         if (!user) throw new Error("User not authenticated");
//         const inputText = formData.get('inputText') as string;
//         if (!inputText) throw new Error("Field is required");
//         if (!postId) throw new Error("Post id required");

//         const userDatabase: IUser = {
//             firstName: user.firstName || "Patel",
//             lastName: user.lastName || "Mern Stack",
//             userId: user.id,
//             profilePhoto: user.imageUrl
//         }
//         const post = await Post.findById({ _id: postId });
//         if (!post) throw new Error('Post not found');

//         const comment = await Comment.create({
//             textMessage: inputText,
//             user: userDatabase,
//         });

//         post.comments?.push(comment._id);
//         await post.save();

//         revalidatePath("/");
//     } catch (error) {
//         throw new Error('An error occurred')
//     }
// }
// export const getAllUsers = async (username = " ") => {
//     try {
//       await connectDB();
//       const user=await currentUser()
//       let users;
//       if (username === " ") {
//         users = await User.find(
          
//           {userId: { $ne:user?.id },}
//         ).select("firstName lastName userId profilePhoto _id");
//       }
//       else{
//         const regex = new RegExp(`^${username}`, "i"); // `i` makes it case-insensitive
  
//         // Query the database
//         users = await User.find({
//           $expr: {
//             $regexMatch: {
//               input: { $concat: ["$firstName", " ", "$lastName"] }, // Combine firstName and lastName
//               regex: regex,
//             },
//           },
//           userId: { $ne:user?.id },
//         }).select("firstName lastName userId profilePhoto _id bio");
//       }
//       if (!users || users.length === 0) {
//         throw new Error("No user found");
//       }
//       const mappedUsers = users.map((user) => ({
//         firstName: user.firstName,
//         lastName: user.lastName,
//         profilePhoto: user.profilePhoto,
//         userId: user.userId,
//         _id: user._id.toString(),
//         bio:user.bio
//       }));
  
//       return mappedUsers;
//     } catch (error) {
//       console.log(error);
//       return [];
//     }
//   };
  
  
//   export async function handleUSerConnections(user: any) {
//     try {
//       await connectDB();
//       const userPresent = await User.findOne({ userId: user.id }).lean()
  
//       if (!userPresent) {
//         const firstName = user.firstName;
//         const lastName = user.lastName;
//         const userId = user.id;
//         const profilePhoto = user.imageUrl;
//         await User.create({
//           firstName: firstName,
//           lastName: lastName,
//           userId: userId,
//           profilePhoto: profilePhoto,
//         });
//         return;
//       }
//       return userPresent;
//     } catch (error) {
//       console.log(error);
//     }
//   }
  
  
//   export async function handleFollowing(userId: string) {
//     try {
//       const user = await currentUser();
//       if (!user) {
//         throw new Error("user not Authenticated");
//       }
//       await connectDB();
//       const userInfo = await User.findOne({ userId: user.id });
//       if (!userInfo) {
//         throw new Error("User not Authenticated");
//       }
//       if (userInfo.following?.includes(userId)) {
//         await userInfo.updateOne({ $pull: { following: userId } });
//       } else {
//         await userInfo.updateOne({ $addToSet: { following: userId } });
//       }
//       revalidatePath("/");
//       return;
//     } catch (error) {
//       console.log(error);
//     }
//   }
  
  
//   export async function SendConnectionRequest(userId: string) {
//     try {
//       // Connect to the database
//       await connectDB();
  
//       // Get the current authenticated user
//       const currentuser = await currentUser();
//       if (!currentuser) throw new Error("User not authenticated");
  
//       // Fetch the current user and the requested user
//       const [user, requestedUser] = await Promise.all([
//         User.findOne({ userId: currentuser.id }),
//         User.findOne({ userId }),
//       ]);
  
//       if (!user) throw new Error("Current user does not exist");
//       if (!requestedUser) throw new Error("Requested user does not exist");
  
//       // Check if the request already exists in the `sentRequest` array
//       const alreadySent = user.sentReqest?.some((req) => req.receiverId === userId);
//       const alreadyReceived = requestedUser.requests?.some((req) => req.receiverId === currentuser.id);
  
//       // Define actions for the current user and the requested user
//       const userAction = alreadySent
//         ? { $pull: { sentReqest: { receiverId: userId } } }
//         : { $addToSet: { sentReqest: { receiverId: userId, sentAt: new Date() } } };
  
//       const requestedUserAction = alreadyReceived
//         ? { $pull: { requests: { receiverId: currentuser.id } } }
//         : { $addToSet: { requests: { receiverId: currentuser.id, sentAt: new Date() } } };
  
//       // Update both users in parallel
//       await Promise.all([
//         user.updateOne(userAction),
//         requestedUser.updateOne(requestedUserAction),
//       ]);
//     } catch (error) {
//       console.log("Error sending connection request:", error);
//       throw error; // Re-throw the error for the caller to handle
//     }
//   }
  
  
  
//   export async function getCurrentUser(userId: string) {
//     try {
//       await connectDB();
  
//       const user = await User.findOne({ userId: userId }).lean(); // Returns a plain object
//       if (!user) {
//         throw new Error("User does not exist");
//       }
//       console.log(user);
      
//       return user; // Plain object
//     } catch (error) {
//       console.log(error);
//       throw error; // Re-throw error for the caller to handle
//     }
//   }
  
//   export async function getAllRequests() {
//     try {
//       const currentuser = await currentUser();
//       await connectDB();
  
//       if (!currentuser) throw new Error("User not authenticated");
  
//       // Find the user based on the userId and populate the requestsDetails virtual field
//       const user = await User.findOne({ userId: currentuser.id })
//         .populate({
//           path: "requestsDetails",
//            // Virtual field to populate
//           // select: "firstName lastName userId profilePhoto bio", // Fields to select from the referenced User
//         })
//         .lean(); // Use lean to get a plain JavaScript object for faster queries
  
//       if (!user) {
//         throw new Error("User does not exist");
//       }
//       const requestsWithDetails = user.requests?.map((request) => {
//         const receiverDetails = user.requestsDetails?.find(
//           (detail) => detail.userId === request.receiverId
//         );
//         return {
//           ...receiverDetails,
//           sentAt: request.sentAt, // Add sentAt time to the populated details
//         };
//       });
//       return requestsWithDetails; // Return the populated requests
  
//     } catch (error) {
//       console.log(error);
//       throw error; // Re-throw error for the caller to handle
//     }
//   }
  
  
//   export async function RequestHandler(check: boolean, userId: string) {
//     try {
//       const currentuser = await currentUser();
//       await connectDB();
  
//       if (!currentuser) throw new Error("User not authenticated");
  
//       // Find the current user and the requested user
//       const user = await User.findOne({ userId: currentuser.id });
//       const requestedUser = await User.findOne({ userId });
  
//       if (!user || !requestedUser) {
//         throw new Error("User does not exist");
//       }
  
//       if (check) {
//         // Accept the request
//         await user.updateOne({
//           $pull: { requests: { receiverId: userId } }, // Remove from requests array
//           $addToSet: { connections: userId }, // Add to connections
//         });
  
//         await requestedUser.updateOne({
//           $pull: { sentReqest: { receiverId: currentuser.id } }, // Remove from sentReqest array
//           $addToSet: { connections: currentuser.id }, // Add to connections
//         });
//       } else {
//         // Reject the request
//         await user.updateOne({
//           $pull: { requests: { receiverId: userId } }, // Remove from requests array
//         });
//       }
//       // revalidatePath("/")
//     } catch (error) {
//       console.log(error);
//       throw error; // Re-throw error for the caller to handle
//     }
//   }
  "use server";
// import {v2 as cloudinary} from "next-cloudinary"
import { Post } from "@/models/post.model"
import { IUser, User } from "@/models/user.model";
import { currentUser, } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { connectDB } from "./db";
import { revalidatePath } from "next/cache";
import { Comment } from "@/models/comment.model";
import { UserType } from "@/models/UserInfo";
import { useUser } from "@clerk/nextjs";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
// creating the post
export const createPostAction = async (
  inputText: string,
  selectedFile: string
) => {
  await connectDB();
  const user= await currentUser();
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

    if (image) {
      uploadResponse = await cloudinary.uploader.upload(image);
      await Post.create({
        description: inputText,
        user: userDatabase,
        // image Url from cloudinary
        // imageUrl:image
        imageUrl: uploadResponse?.secure_url,
      });
    } else {
      await Post.create({
        description: inputText,
        user: userDatabase,
      });
    }
    // when you upload the path it should be visible in the ral time so you are playing with the cache
    revalidatePath("/");
  } catch (error) {
    // console.log(error.message);
    console.log(error);
  }
};

//get all post using server action
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
      console.log(username);

      const regex = new RegExp(`^${username}`, "i");
      posts = await Post.find()
        .where({
          $expr: {
            $regexMatch: {
              input: { $concat: ["$user.firstName", " ", "$user.lastName"] },
              regex,
            },
          },
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
  } catch (error) {
    throw new Error("Error ocuured"+error);
  }
};

export const getAllUsers = async (username = " ") => {
  try {
    await connectDB();
    const user=await currentUser()
    let users:UserType[];
    if (username === " ") {
      users = await User.find(
        
        {userId: { $ne:user?.id },}
      ).select("firstName lastName userId profilePhoto _id");
    }
    else{
      const regex = new RegExp(`^${username}`, "i"); // `i` makes it case-insensitive

      // Query the database
      users = await User.find({
        $expr: {
          $regexMatch: {
            input: { $concat: ["$firstName", " ", "$lastName"] }, // Combine firstName and lastName
            regex: regex,
          },
        },
        userId: { $ne:user?.id },
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


export async function handleUSerConnections(user: any) {
  try {
    await connectDB();
    const userPresent = await User.findOne({ userId: user.id }).lean()

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
    const alreadySent = user.sentReqest?.some((req) => req.receiverId === userId);
    const alreadyReceived = requestedUser.requests?.some((req) => req.receiverId === currentuser.id);

    // Define actions for the current user and the requested user
    const userAction = alreadySent
      ? { $pull: { sentReqest: { receiverId: userId } } }
      : { $addToSet: { sentReqest: { receiverId: userId, sentAt: new Date() } } };

    const requestedUserAction = alreadyReceived
      ? { $pull: { requests: { receiverId: currentuser.id } } }
      : { $addToSet: { requests: { receiverId: currentuser.id, sentAt: new Date() } } };

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
    const Cuser=await currentUser()

    const user = await User.findOne({ userId: Cuser?.id }) // Returns a plain object
    if (!user) {
      throw new Error("User does not exist");
    }
    
    return JSON.parse(JSON.stringify(user)); // Plain object
  } catch (error) {
    console.log(error);
    throw error; // Re-throw error for the caller to handle
  }
}

export async function getAllRequests() {
  try {
    const currentuser = await currentUser();
    await connectDB();

    if (!currentuser) throw new Error("User not authenticated");

    // Find the user based on the userId and populate the requestsDetails virtual field
    const user = await User.findOne({ userId: currentuser.id })
      .populate({
        path: "requestsDetails",
         // Virtual field to populate
        // select: "firstName lastName userId profilePhoto bio", // Fields to select from the referenced User
      })
      .lean(); // Use lean to get a plain JavaScript object for faster queries

    if (!user) {
      throw new Error("User does not exist");
    }
    const requestsWithDetails = user.requests?.map((request) => {
      const receiverDetails = user.requestsDetails?.find(
        (detail) => detail.userId === request.receiverId
      );
      return {
        ...receiverDetails,
        sentAt: request.sentAt, // Add sentAt time to the populated details
      };
    });
    return requestsWithDetails; // Return the populated requests

  } catch (error) {
    console.log(error);
    throw error; // Re-throw error for the caller to handle
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
