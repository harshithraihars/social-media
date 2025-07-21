import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { mentorId: string } }
) => {
  const { mentorId } = params;
  const date = new URL(req.url).searchParams.get("date");

  if (!mentorId || !date)
    return Response.json(
      { error: "Missing date or mentorId" },
      { status: 400 }
    );

  const start = new Date(date);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const bookings = await Booking.find({
    mentorId,
    date: { $gte: start, $lte: end },
  }).select("time");

  const bookedTimes = bookings.map((b) => b.time);
  return Response.json({ bookedTimes });
};
