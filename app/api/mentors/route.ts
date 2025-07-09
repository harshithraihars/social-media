import connectDB from "@/lib/db";
import { Profile } from "@/models/profile.model";
import { User } from "@/models/user.model";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const CompanyName = searchParams.get("CompanyName");

    const Role = searchParams.get("Role");

    const { userId } = auth();

    const query: Record<string, any> = {
      userId: { $ne: userId },
    };
    if (CompanyName) query.CompanyName = { $regex: CompanyName, $options: "i" };

    if (Role) query.Role = { $regex: Role, $options: "i" };

    const mentors = await Profile.find(query).select(
      "_id userId firstName lastName profilePhoto About CompanyName Role Skills Rate Rating"
    ).lean()
    
    return NextResponse.json(mentors, { status: 200 });
  } catch (error) {
    console.error("Error fetching mentors:", error);
    return NextResponse.json(
      { message: "Failed to fetch mentors", error },
      { status: 500 }
    );
  }
};
