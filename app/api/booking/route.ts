import { Booking } from "@/models/Booking.model";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ error: "Un Authorized" }, { status: 401 });

    const url = new URL(req.url);
    const params = url.searchParams;
    const callId = params.get("callId");

    if (!callId)
      return NextResponse.json(
        { error: "call ID is required" },
        { status: 400 }
      );

    const res = await Booking.findOne({ callId: callId }).select(
      "menteeId mentorId"
    );
    if (!res)
      return NextResponse.json({ error: "No Booking found" }, { status: 400 });


    return NextResponse.json({ data: res }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
};
