import { Booking } from "@/models/Booking.model";
import { User } from "@/models/user.model";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id=await User.findOne({userId}).select("_id")
 const bookingsRaw = await Booking.find({ mentorId: id })
    .select("_id date time Duration sessionAmount")
    .populate({
      path: "mentorId",
      select: "userId firstName lastName profilePhoto",
      model: "User",
    })
    .lean();

  const today = new Date();

  bookingsRaw.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    const isFutureA = dateA >= today;
    const isFutureB = dateB >= today;

    if (isFutureA && !isFutureB) return -1;
    if (!isFutureA && isFutureB) return 1;

    return dateA.getTime() - dateB.getTime();
  });

  const bookings = bookingsRaw.slice(0, 5).map((booking) => ({
    id: booking.mentorId?.userId,
    bookingId:booking._id.toString(),
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
