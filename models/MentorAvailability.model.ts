import mongoose, { model, Schema } from "mongoose";

const mentorAvailabilitySchema = new Schema({
  mentorId: {
    type: mongoose.Schema.ObjectId,
    ref: "Profile",
    required: true,
  },
  availability: {
    type: Map,
    of: [String], 
    required: true,
  },
});
export const MentorAvailability =
  mongoose.models.mentorAvailability ||
  model("mentorAvailability", mentorAvailabilitySchema);
