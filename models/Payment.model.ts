import mongoose, { model, Schema } from "mongoose";

export interface IPayment {
  mentorId: string;
  menteeId: string;
  Amount: number;
  CreatedAt: Date;
}
const paymentSchema = new Schema<IPayment>({
  mentorId: {
    type: String,
    required: true,
  },
  menteeId: {
    type: String,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
});
export const Payment =
  mongoose.models.Payment || model<IPayment>("Payment", paymentSchema);
