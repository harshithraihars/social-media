import { User } from "@/models/user.model"; // ✅ Required for nested population to work
import { Profile } from "@/models/profile.model";
import connectDB from "@/lib/db";
import { Booking } from "@/models/Booking.model";
import mongoose from "mongoose";
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
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("userId");
    console.log(id);

    if (!id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // const bookings = await Booking.find({
    //   menteeId: new mongoose.Types.ObjectId(id),
    // })
    //   .populate({
    //     path: "mentorId",
    //     model: "User",
    //     populate: {
    //       path: "profile", // <- virtual field
    //       model: "Profile",
    //     },
    //   })
    //   .lean({ virtuals: true });
    // // bookings.map((booking) => {
    // //   console.log(booking.mentor);
    // // });
    // const userid = new mongoose.Types.ObjectId(id);
    // const bookings = await User.findById(userid)
    //   .populate("profile") // populate virtual 'profile'
    //   .lean({ virtuals: true });

    // console.log(bookings);
    const user = await User.findOne({_id:new mongoose.Types.ObjectId(id)})
      .populate({
        path: "requestsDetails",
        select: "firstName lastName profilePhoto userId _id bio",
      })
      .lean({ virtuals: true });
      console.log(user);
      
    return NextResponse.json({ data: "ekdkd" });
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
