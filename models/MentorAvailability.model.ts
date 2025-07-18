import mongoose, { model, Schema } from "mongoose";

const mentorAvailabilitySchema=new Schema({
    mentorId:{
        type:mongoose.Schema.ObjectId,
        ref:"Profile",
        required:true,
    },
    availability: {
    Mon: [String],
    Tue: [String],
    Wed: [String],
    Thu: [String],
    Fri: [String],
  },
})
export const MentorAvailability =
  mongoose.models.mentorAvailability || model("mentorAvailability", mentorAvailabilitySchema);