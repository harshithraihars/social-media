import connectDB from "@/lib/db";
import { Booking } from "@/models/Booking.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    
    const { mentorId, menteeId, date, time, sessionAmount } = await req.json();

    if (![mentorId, menteeId, date, time, sessionAmount].every(Boolean)) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    await Booking.create({ mentorId, menteeId, date, time, sessionAmount });

    return NextResponse.json(
      { message: "Booking successful." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong.", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
};

