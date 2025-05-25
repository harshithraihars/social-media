import { Booking } from "@/models/Booking.model";
import { User } from "@/models/user.model";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id=await User.findOne({userId}).select("_id")
  const bookingsRaw = await Booking.find({ mentorId: id })
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
