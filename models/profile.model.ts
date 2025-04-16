import mongoose, { Model } from "mongoose";

interface IProfile {
  user: mongoose.Schema.Types.ObjectId;
  CompanyName: string;
  Role: string;
  Skills: string[];
  About: string;
  Rate: Number;
}

const profileSchema = new mongoose.Schema<IProfile>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
});

export const Profile: Model<IProfile> =
  mongoose.models?.Profile ||
  mongoose.model<IProfile>("Profile", profileSchema);
