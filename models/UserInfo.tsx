import { ObjectId } from "mongoose"

export type UserType={
  firstName:string,
  lastName:string,
  userId:string,
  profilePhoto:any,
  _id:string
  bio?:string
}