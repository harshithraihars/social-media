import { Booking } from "@/models/Booking.model";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { bookingId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ error: "Un Authorized" }, { status: 401 });

    const { bookingId } = params;

    if (!bookingId)
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );

    const { callId } = await req.json();
    const booking = await Booking.findByIdAndUpdate(bookingId, {
      callId,
    });

    return NextResponse.json(
      { details: "callId updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { bookingId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ error: "Un Authorized" }, { status: 401 });

    const { bookingId } = params;

    if (!bookingId)
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );

    const callId = await Booking.findById(bookingId).select("callId");

    if (!callId) {
      return NextResponse.json(
        { error: "callId doesn't exist" },
        { status: 400 }
      );
    }

    return NextResponse.json({ data: callId }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
};
