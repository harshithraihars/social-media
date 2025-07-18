import { Payment } from "@/models/Payment.model";
import { IProfile, Profile } from "@/models/profile.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    
    if (!userId)
      return NextResponse.json(
        { message: "UserId not provided" },
        { status: 400 }
      );

    const userProfile = await Profile.findOne({ userId: userId }).lean<IProfile>();
        
    const transactions=await Payment.find({mentorId:userProfile?._id}).sort({createdAt:-1}).limit(4).lean();
    if (!userProfile) {
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 }
      );
    }
        
    return NextResponse.json({ data:{
      profile:userProfile,
      transactions:transactions
    } }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch Earnings", error },
      { status: 500 }
    );
  }
};
