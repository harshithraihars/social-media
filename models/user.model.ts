import mongoose, { Document, Model, Mongoose } from "mongoose";

// Define the Sent interface
interface Sent {
  receiverId: string;
  sentAt: Date;
}

// Define the IUser interface
export interface IUser {
  firstName: string;
  lastName: string;
  userId: string;
  profilePhoto?: string;
  bio?: string;
  following?: [string];
  connections?: [string];
  sentReqest?: Sent[];
  requests?: Sent[];
  Bookings?:mongoose.Types.ObjectId[]
  MentorshipEnabled: Boolean;
}

// Define the IUserDocument interface that extends mongoose Document
export interface IUserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
  requestsDetails?: IUser[];
}

// Define the userSchema
const userSchema = new mongoose.Schema<IUserDocument>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    following: {
      type: [String],
    },
    connections: {
      type: [String],
      ref: "User",
      default: [],
    },
    sentReqest: [
      {
        receiverId: { type: String, ref: "User" },
        sentAt: { type: Date, default: Date.now },
      },
    ],
    requests: [
      {
        receiverId: { type: String, ref: "User" },
        sentAt: { type: Date, default: Date.now },
      },
    ],
    Bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    MentorshipEnabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Define a virtual field for populating `requests.receiverId`
userSchema.virtual("requestsDetails", {
  ref: "User", // Reference to the `User` model
  localField: "requests.receiverId", // Field in the current model (user's `requests.receiverId`)
  foreignField: "userId", // Field in the referenced model (`User` model's `userId`)
  justOne: false, // It's an array of objects, so it's false
});

userSchema.virtual("profile", {
  ref: "Profile",
  localField: "userId",      // This is the string from Clerk
  foreignField: "userId",    // Also a string in Profile
  justOne: true,
});


// Include virtual fields in JSON and plain object output
userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

// Create the model
export const User: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>("User", userSchema);
