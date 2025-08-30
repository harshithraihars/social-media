import connectDB from "@/lib/db";
import { Booking } from "@/models/Booking.model";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, { params }: { params: { bookingId: string } }) => {
  try {
    await connectDB();

    const { bookingId } = params;

    const { status, paymentId } = await req.json();

    if (!status || !paymentId) {
      return NextResponse.json(
        { error: "Status and paymentId are required." },
        { status: 400 }
      );
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    booking.status = status;
    booking.paymentId = paymentId;

    await booking.save();

    return NextResponse.json({ message: "Booking updated successfully.", booking }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something went wrong.",
        details: error,
      },
      { status: 500 }
    );
  }
};

