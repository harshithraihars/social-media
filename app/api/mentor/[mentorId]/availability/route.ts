import { MentorAvailability } from "@/models/MentorAvailability.model";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export const PUT=async(req:NextRequest,{params}:{params:{mentorId:string}})=>{
    try{
        const {mentorId}=params;
        if(!mentorId){
            return NextResponse.json({message:"MentorId Not provided"},{status:400})
        }

        const body=await req.json();
        const {availability}=body;
        
        if(!availability){
            return NextResponse.json({ message: "Invalid availability data" }, { status: 400 });
        }

        await MentorAvailability.findOneAndUpdate(
            {mentorId:mentorId},
            { availability },
            { upsert: true, new: true }
        )
        return NextResponse.json({message:"Availability updated successfully"},{status:200})
    }catch(error){
        return NextResponse.json({error:error},{status:500})
    }

}

export const GET=async(req:NextRequest,{params}:{params:{mentorId:string}})=>{
    try{
        const {mentorId}=params;
        if(!mentorId){
            return NextResponse.json({message:"MentorId Not provided"},{status:400})
        }

        const availability=await MentorAvailability.findOne({mentorId:mentorId})

        if(!availability){
            return NextResponse.json({ message: "no data found" }, { status: 400 });
        }
        return NextResponse.json({availability:availability},{status:200})
    }catch(error){
        return NextResponse.json({error:error},{status:500})
    }

}