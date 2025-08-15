import { Payment } from "@/models/Payment.model";
import { IProfile, Profile } from "@/models/profile.model";

export async function getprofile(userId: string) {
  if (!userId) {
    throw new Error("UserId not provided");
  }

  const userProfile = await Profile.findOne({ userId }).lean<IProfile>();
  if (!userProfile) {
    return null;
  }

  const transactions = await Payment.find({ mentorId: userProfile._id })
    .sort({ createdAt: -1 })
    .limit(4)
    .lean();

  return {
    profile: userProfile,
    transactions,
  };
}