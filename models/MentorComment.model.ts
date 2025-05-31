import mongoose, { Schema } from "mongoose";

export interface IMentorComment {
  MentorId: mongoose.Types.ObjectId
  MenteeId: mongoose.Types.ObjectId
  comment: string;
}

const MentorComments = new mongoose.Schema<IMentorComment>({
  MentorId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  MenteeId:{
    type: Schema.Types.ObjectId,
    required: true
  },
  comment: {
    type: String,
    required: true,
  },
});

export const Profile =
  mongoose.models.Mentor ||
  mongoose.model<IMentorComment>("Profile", MentorComments);
