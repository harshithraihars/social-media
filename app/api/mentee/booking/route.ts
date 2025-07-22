import { BookingI } from "@/app/Mentorship/pages/MentorShipHeader";
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

    // create the booking
    const booking = await Booking.create({
      mentorId,
      menteeId,
      menteeEmail,
      date,
      time,
      Duration,
      sessionAmount,
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

    console.log(availability);
    
    const dateKey = new Date(date).toLocaleDateString("en-CA");
    console.log(dateKey);
    

    // convert Mongoose Map to plain object because they cause  issue in spreading 
    const availabilityObj =
      availability instanceof Map
        ? Object.fromEntries(availability)
        : availability;

    const updatedAvailability = {
      ...availabilityObj,
      [dateKey]: availabilityObj[dateKey]?.filter((t: string) => t !== time),
    };

    console.log(updatedAvailability);
    
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
      { message: "Booking successful." },
      { status: 201 }
    );
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

export const GET = async () => {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await Profile.findOne({});

    const user = await User.findOne({ userId }).select("_id");

    const bookingsRaw = await Booking.find({ menteeId: user })
      .select("_id date time Duration sessionAmount")
      .populate({
        path: "mentorId",
        select:
          "userId firstName lastName profilePhoto CompanyName Role Rating",
        model: "Profile",
      })
      .lean();

    bookingsRaw.sort((a, b) => {
      const now = new Date();

      const getDateTime = (booking: any) => {
        const dateStr = new Date(booking.date).toISOString().split("T")[0];
        return new Date(`${dateStr} ${booking.time}`);
      };

      const dateTimeA = getDateTime(a);
      const dateTimeB = getDateTime(b);

      const isUpcomingA = dateTimeA >= now;
      const isUpcomingB = dateTimeB >= now;

      if (isUpcomingA && !isUpcomingB) return -1;
      if (!isUpcomingA && isUpcomingB) return 1;

      return dateTimeA.getTime() - dateTimeB.getTime();
    });

    const bookings = bookingsRaw.slice(0, 5).map((booking) => ({
      id: booking.mentorId?.userId,
      bookingId: booking._id,
      date: booking.date,
      time: booking.time,
      Duration: booking.Duration,
      sessionAmount: booking.sessionAmount,
      firstName: booking.mentorId?.firstName || "",
      lastName: booking.mentorId?.lastName || "",
      profilePhoto: booking.mentorId?.profilePhoto || "",
      Role: booking.mentorId?.Role,
      CompanyName: booking.mentorId?.CompanyName,
      Rating: booking.mentorId?.Rating,
    }));

    return NextResponse.json({ data: bookings });
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
