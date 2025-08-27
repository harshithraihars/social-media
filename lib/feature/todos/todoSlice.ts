import { IPayment } from "@/models/Payment.model";
import { IPostDocument } from "@/models/post.model";
import { IProfile } from "@/models/profile.model";
import { IUser, IUserDocument } from "@/models/user.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createEntityAdapter } from "@reduxjs/toolkit";
import mongoose, { Connection } from "mongoose";

import type { Update } from "@reduxjs/toolkit";

export interface IProfileWithPayments extends IProfile {
  transactions: IPayment[];
}

// post adapter for more efficient look ups
const postsAdapter = createEntityAdapter<IPostDocument>({
  selectId: (post) => post._id, // use MongoDB's _id
  sortComparer: (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(), // newest first
});

// Define the shape of the state
export interface CounterState
  extends ReturnType<typeof postsAdapter.getInitialState> {
  searchResult: UserResult[];
  user: IUserDocument | null;
  isPostsLoaded:boolean;
  ConnectionRequest: ConnectionRequest[];
  isMentor: boolean;
  userProfile: IProfileWithPayments | null;
}
export interface UserResult {
  firstName: string;
  lastName: string;
  profilePhoto: string;
  userId: string;
  _id: mongoose.Types.ObjectId|string;
  bio?: string;
}
export interface ConnectionRequest extends UserResult {
  sentAt: Date;
}
// Initial state of the counter
const initialState: CounterState = {
  ...postsAdapter.getInitialState(),
  searchResult: [],
  user: null,
  isPostsLoaded:false,
  ConnectionRequest: [],
  isMentor: true,
  userProfile: null,
};

// Creating the slice
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setAllPosts: (state, action: PayloadAction<IPostDocument[]>) => {
      postsAdapter.setAll(state, action.payload);
      state.isPostsLoaded=true;
    },
    addPost: (state, action: PayloadAction<IPostDocument>) => {
      postsAdapter.addOne(state, action.payload);
    },
    updatePost: (
      state,
      action: PayloadAction<Update<IPostDocument, string>>
    ) => {
      postsAdapter.updateOne(state, action.payload);
    },

    removePost: (state, action: PayloadAction<string>) => {
      postsAdapter.removeOne(state, action.payload);
    },

    setSearchUsers: (state, action: PayloadAction<any>) => {
      state.searchResult = action.payload;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setRequest: (state, action: PayloadAction<any>) => {
      state.ConnectionRequest = action.payload;
    },
    setMentee: (state, action: PayloadAction<any>) => {
      state.isMentor = action.payload;
    },
    setUserProfile: (state, action: PayloadAction<any>) => {
      state.userProfile = action.payload;
    },
  },
});

export const postsSelectors = postsAdapter.getSelectors(
  (state: { counter: CounterState }) => state.counter
);

// Export the actions
export const {
  setAllPosts,
  addPost,
  updatePost,
  removePost,
  setSearchUsers,
  setUser,
  setRequest,
  setMentee,
  setUserProfile,
} = counterSlice.actions;

// Export the reducer
export default counterSlice.reducer; // This is where we export the counterReducer
