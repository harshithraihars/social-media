import { MentorComments } from "@/models/MentorComment.model";
import { IProfile, Profile } from "@/models/profile.model";
import { User } from "@/models/user.model";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { mentorId, menteeId, comment, rating } = await req.json();

    console.log(mentorId, menteeId, rating, comment);

    if (!mentorId || !menteeId || !comment || !rating) {
      return NextResponse.json(
        { details: "All fields are Required" },
        { status: 400 }
      );
    }

    const booking = await MentorComments.create({
      mentorId,
      menteeId,
      comment,
    });
    const res = await User.findById(mentorId)
      .select("profileId")
      .populate({
        path: "profileId",
        select: "bookingCount rating",
      })
      .lean();

    const profile = res?.profileId as unknown as IProfile;
    const profileId = res?.profileId?._id;
    const oldRating = profile.Rating ?? 0
    const bookingsCount = profile.bookingsCount ?? 0;
    const newRating =
      ((bookingsCount * oldRating) + rating) / (bookingsCount + 1);

    const upgradedProfile = await Profile.findByIdAndUpdate(profileId, {
      $set: { Rating: newRating },
      $inc: { bookingsCount: 1 },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
};

