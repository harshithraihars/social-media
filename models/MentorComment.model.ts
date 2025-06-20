import mongoose, { Schema } from "mongoose";

export interface IMentorComment {
  mentorId: mongoose.Types.ObjectId
  menteeId: mongoose.Types.ObjectId
  comment: string;
}

const MentorCommentsSchema = new mongoose.Schema<IMentorComment>({
  mentorId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  menteeId:{
    type: Schema.Types.ObjectId,
    ref:"User",
    required: true
  },
  comment: {
    type: String,
    required: true,
  },
});

export const MentorComments =
  mongoose.models.MentorComments ||
  mongoose.model<IMentorComment>("MentorComments", MentorCommentsSchema);
