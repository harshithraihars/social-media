import { Booking } from "@/models/Booking.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { mentorId: string } }
) => {
  try {
    const { mentorId } = params;
    const date = new URL(req.url).searchParams.get("date");

    if (!mentorId || !date)
      return Response.json(
        { error: "Missing date or mentorId" },
        { status: 400 }
      );

      // convert to local date
      
    const start = new Date(`${date}T00:00:00`);
    const end = new Date(`${date}T23:59:59.999`);

    const bookings = await Booking.find({
      mentorId,
      date: { $gte: start, $lte: end },
    }).select("time");

    const bookedTimes = bookings.map((b) => b.time);
    return Response.json({ bookedTimes });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
