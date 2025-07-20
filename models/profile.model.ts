import mongoose, { Document, Model } from "mongoose";

export interface IProfile extends Document {
  firstName:string,
  lastName:string,
  MentorshipEnabled:boolean,
  profilePhoto:string,
  userId: string;
  CompanyName: string;
  Role: string;
  Skills: string[];
  About: string;
  Rate: number;
  Rating: number;
  bookingsCount:number
  Earning:number
}

const profileSchema = new mongoose.Schema<IProfile>({
  firstName:{
    type:String,
    required:true,
  },
  lastName:{
    type:String,
    required:true,
  },
  MentorshipEnabled: {
      type: Boolean,
      default: true,
    },

  profilePhoto:{
    type:String,
    required:true
  },
  userId: {
    type: String,
    required: true,
  },
  CompanyName: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    required: true,
  },
  Skills: {
    type: [String],
    required: true,
  },
  About: {
    type: String,
    required: true,
  },
  Rate: {
    type: Number,
    required: true,
  },
  Rating: {
    type: Number,
    default: 0,
  },
  bookingsCount:{
    type:Number,
    default:0
  },
  Earning:{
    type:Number,
    default:0
  }
});

export const Profile =
  mongoose.models.Profile || mongoose.model<IProfile>("Profile", profileSchema);
