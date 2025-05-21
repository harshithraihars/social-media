import connectDB from "@/lib/db";
import { Booking } from "@/models/Booking.model";
import { currentUser } from "@clerk/nextjs/server";
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


export const GET = async (req: NextRequest) => {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookings = await Booking.find({ menteeId: user.id })
  .populate({
    path: "mentorId",
    model: "User",
  })
  .lean();
      console.log(bookings);
      
    return NextResponse.json({ data: bookings });
  } catch (error) {
    console.log(error.message);
    
    return NextResponse.json(
      {
        error: "Something went wrong.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
};

