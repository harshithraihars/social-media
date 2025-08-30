import { BookingI } from "@/app/Mentorship/components/navigation/MentorShipHeader";
import connectDB from "@/lib/db";
import { Booking } from "@/models/Booking.model";
import { MentorAvailability } from "@/models/MentorAvailability.model";
import { Payment } from "@/models/Payment.model";
import { Profile } from "@/models/profile.model";
import { User } from "@/models/user.model";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    // mentorid is profileID not User id
    const {
      mentorId,
      menteeId,
      menteeEmail,
      date,
      time,
      Duration,
      sessionAmount,
      
    } = await req.json();

    if (
      ![
        mentorId,
        menteeId,
        menteeEmail,
        date,
        time,
        Duration,
        sessionAmount,
      ].every(Boolean)
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }
    
    const existingBooking = await Booking.findOne({ mentorId, date, time });
    if (existingBooking) {
      return NextResponse.json(
        { error: "This time slot is already booked." },
        { status: 400 }
      );
    }

    // create the booking
    const booking = await Booking.create({
      mentorId,
      menteeId,
      menteeEmail,
      date,
      time,
      Duration,
      sessionAmount,
      status: 'pending'
    });

    // store the payment Details
    const payment = await Payment.create({
      mentorId,
      menteeId,
      Amount: sessionAmount,
    });

    // update mentor earning
    const updatedProfile = await Profile.findByIdAndUpdate(mentorId, {
      $inc: {
        Earning: sessionAmount,
      },
    });

    // update the mentor avilability so that others know its not avilable

    const { availability } = await MentorAvailability.findOne({
      mentorId: mentorId,
    }).select("availability");

    const dateKey = new Date(date).toLocaleDateString("en-CA");

    // convert Mongoose Map to plain object because they cause  issue in spreading
    const availabilityObj =
      availability instanceof Map
        ? Object.fromEntries(availability)
        : availability;

    const updatedAvailability = {
      ...availabilityObj,
      [dateKey]: availabilityObj[dateKey]?.filter((t: string) => t !== time),
    };

    await MentorAvailability.findOneAndUpdate(
      { mentorId },
      { availability: updatedAvailability }
    );

    await MentorAvailability.findOneAndUpdate(
      { mentorId: mentorId },
      {
        availability: updatedAvailability,
      }
    );

    return NextResponse.json(
      { message: "Booking successful.",_id: booking._id},
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
