import mongoose, { Schema, model, models, Document, Mongoose } from "mongoose";

interface IBooking extends Document {
  mentorId: mongoose.Types.ObjectId;
  menteeId: mongoose.Types.ObjectId;
  menteeEmail: string;
  date: Date;
  time: string;
  Duration: string;
  sessionAmount: number;
  createdAt: Date;
  status: string;
  paymentId: string;
  callId: String;
}

const bookingSchema = new Schema<IBooking>({
  mentorId: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  menteeId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  menteeEmail: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  Duration: {
    type: String,
    required: true,
  },
  sessionAmount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  paymentId: {
    type: String,
    default: null,
  },

  callId: {
    type: String,
    default: null,
  },
});

// prevents duplicate bookings inorder to avoid conflicts
bookingSchema.index({ mentorId: 1, date: 1, time: 1 }, { unique: true });

export const Booking =
  models.Booking || model<IBooking>("Booking", bookingSchema);
