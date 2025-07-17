import {} from "next";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const POST = async (req: NextRequest) => {
  try {
    const { amount } = await req.json();
    console.log("getting here what the hell is wrong");
    
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `recipt_${Date.now()}`,
      payment_capture: 1,
    }
    
    const order = (await razorpay.orders.create(options)) as any;

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Order creation failed", details: error },
      { status: 500 }
    );
  }
};
