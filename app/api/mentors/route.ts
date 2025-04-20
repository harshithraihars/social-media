import connectDB from "@/lib/db";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { Profile } from "@/models/profile.model";
// Interface for query filter
interface MentorQuery {
  MentorshipEnabled: boolean;
  company?: string;
  role?: string;
}

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const company = searchParams.get("company");
    const role = searchParams.get("role");

    const query: MentorQuery = {
      MentorshipEnabled: true,
    };

    if (company) query.company = company;
    if (role) query.role = role;

    const mentors = await User.aggregate([
      { $match: { MentorshipEnabled: true } },
      {
        $lookup: {
          from: "profiles",
          localField: "userId",
          foreignField: "userId",
          as: "profile"
        }
      },
      { $unwind: "$profile" },
      ...(company ? [{ $match: { "profile.CompanyName": company } }] : []),
      ...(role ? [{ $match: { "profile.Role": role } }] : [])
    ]);
    

    return NextResponse.json(mentors, { status: 200 });

  } catch (error) {
    console.error("Error fetching mentors:", error);
    return NextResponse.json(
      { message: "Failed to fetch mentors", error },
      { status: 500 }
    );
  }
};
