

import connectDB from "@/lib/db";
import { MentorAvailability } from "@/models/MentorAvailability.model";
import { Profile } from "@/models/profile.model";
import { error, profile } from "console";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { mentorId: string } }
) => {
  try {
    const { mentorId } = params;
    if (!mentorId) {
      return NextResponse.json(
        { message: "MentorId Not provided" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { availability, isAcceptingMentees, hourlyRate, isPaidMentorship } =
      body;

    if (!availability) {
      return NextResponse.json(
        { message: "Invalid availability data" },
        { status: 400 }
      );
    }

    await connectDB()
    await MentorAvailability.findOneAndUpdate(
      { mentorId: mentorId },
      { availability },
      { upsert: true, new: true }
    );

    const updatedProfile = await Profile.findByIdAndUpdate(mentorId, {
      MentorshipEnabled: isAcceptingMentees,
      Rate: isPaidMentorship ? hourlyRate : 0,
    });

    return NextResponse.json(
      { message: "Availability updated successfully" },
      { status: 200 }
    );
  } catch (error) {    
    return NextResponse.json({ error: error }, { status: 500 });
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { mentorId: string } }
) => {
  try {
    const { mentorId } = params;
    const date = req.nextUrl.searchParams.get("date");
    if (!mentorId) {
      return NextResponse.json(
        { message: "MentorId Not provided" },
        { status: 400 }
      );
    }

    await connectDB()

    const availabilityDoc = await MentorAvailability.findOne({
      mentorId: mentorId,
    })||{}
    
    if (date) {
      
      
      const dateKey = new Date(date).toISOString().split("T")[0];
      
      const slotsForDate = availabilityDoc?.availability?.get(dateKey) ?? [];      
      return NextResponse.json(
        { availability: slotsForDate},
        { status: 200 }
      );
    }
    return NextResponse.json(
      { availability: availabilityDoc ?? {} },
      { status: 200 }
    );
  } catch (error:any) {
    console.error("Error found",error.message)
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
