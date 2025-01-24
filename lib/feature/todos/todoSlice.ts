// // lib/counterSlice.ts

// import { IPostDocument } from '@/models/post.model'
// import { IUserDocument } from '@/models/user.model'
// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import mongoose from 'mongoose'

// // Define the shape of the state
// interface CounterState {
//   isSearching:boolean
//   posts:IPostDocument[],
//   searchResult:UserResult[]
//   user:IUserDocument|null
// }
// export interface UserResult {
//   firstName: string;
//   lastName: string;
//   profilePhoto: string;
//   userId: string;
//   _id: mongoose.Types.ObjectId;
//   bio?:string
// }
// // Initial state of the counter
// const initialState: CounterState = {
//   isSearching:false,
//   posts:[],
//   searchResult:[],
//   user:null
// }

// // Creating the slice
// const counterSlice = createSlice({
//   name: 'counter',
//   initialState,
//   reducers: {
    
//     setSearching: (state, action: PayloadAction<boolean>) => {
//       state.isSearching = action.payload
//     },
//     setPosts: (state, action: PayloadAction<any>) => {
//       state.posts=action.payload
//     },
//     setSearchUsers:(state, action: PayloadAction<any>) => {
//       state.searchResult=action.payload
//     },
//     setUser:(state, action: PayloadAction<any>) => {
//       state.user=action.payload
//     }
//   }
// })

// // Export the actions
// export const {setSearching,setPosts,setSearchUsers,setUser } = counterSlice.actions

// // Export the reducer
// export default counterSlice.reducer // This is where we export the counterReducer
// lib/counterSlice.ts


import { IPostDocument } from '@/models/post.model'
import { IUserDocument } from '@/models/user.model'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import mongoose from 'mongoose'

// Define the shape of the state
interface CounterState {
  isSearching:boolean
  posts:IPostDocument[],
  searchResult:UserResult[]
  user:IUserDocument|null
  isLoading:boolean
  input:string
}
export interface UserResult {
  firstName: string;
  lastName: string;
  profilePhoto: string;
  userId: string;
  _id: mongoose.Types.ObjectId;
  bio?:string
}
// Initial state of the counter
const initialState: CounterState = {
  isSearching:false,
  posts:[],
  searchResult:[],
  user:null,
  isLoading:false,
  input:""
}

// Creating the slice
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    
    setSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload
    },
    setPosts: (state, action: PayloadAction<any>) => {
      state.posts=action.payload
    },
    setSearchUsers:(state, action: PayloadAction<any>) => {
      state.searchResult=action.payload
    },
    setUser:(state, action: PayloadAction<any>) => {
      state.user=action.payload
    },
    setisLoading:(state, action: PayloadAction<any>) => {
      state.isLoading=action.payload
    },
    setisInput:(state, action: PayloadAction<any>) => {
      state.input=action.payload
    }
  }
})

// Export the actions
export const {setSearching,setPosts,setSearchUsers,setUser,setisLoading,setisInput } = counterSlice.actions

// Export the reducer
export default counterSlice.reducer // This is where we export the counterReducer