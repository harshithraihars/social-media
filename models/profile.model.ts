import mongoose, { Model } from "mongoose";

interface IProfile {
  userId: string;
  CompanyName: string;
  Role: string;
  Skills: string[];
  About: string;
  Rate: Number;
  Rating:Number;
}

const profileSchema = new mongoose.Schema<IProfile>({
  userId: {
    type:String,
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
  Rating:{
    type:Number,
    default:0
  }
});

export const Profile: Model<IProfile> =
  mongoose.models?.Profile ||
  mongoose.model<IProfile>("Profile", profileSchema);
