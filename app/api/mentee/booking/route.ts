import connectDB from "@/lib/db";
import { Booking } from "@/models/Booking.model";
import { Profile } from "@/models/profile.model";
import { User } from "@/models/user.model";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const { mentorId, menteeId, date, time, Duration, sessionAmount } =
      await req.json();

    // menteeid is the unique id of the model while the mwntorid is the id from the clerkid
    if (
      ![mentorId, menteeId, date, time, Duration, sessionAmount].every(Boolean)
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    await Booking.create({
      mentorId,
      menteeId,
      date,
      time,
      Duration,
      sessionAmount,
    });

    return NextResponse.json(
      { message: "Booking successful." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something went wrong.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
};


export const GET = async () => {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id=await User.findOne({userId}).select("_id")
  const bookingsRaw = await Booking.find({ menteeId: id })
    .select("date time Duration sessionAmount")
    .populate({
      path: "mentorId",
      select: "userId firstName lastName profilePhoto",
      model: "User",
    })
    .sort({ date: 1 })
    .limit(5)
    .lean();

  const bookings = bookingsRaw.map((booking) => ({
    id: booking.mentorId?.userId,
    date: booking.date,
    time: booking.time,
    Duration: booking.Duration,
    sessionAmount: booking.sessionAmount,
    firstName: booking.mentorId?.firstName || "",
    lastName: booking.mentorId?.lastName || "",
    profilePhoto: booking.mentorId?.profilePhoto || "",
  }));

  return NextResponse.json({ data: bookings });
};

