import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

declare global {
  interface window {
    Razorpay: any;
  }
}
interface RazorpayButtonProps {
  date: Date | undefined;
  timeSlot: string | null;
  duration: string;
  totalPrice: number;
  isProcessing: boolean;
  handleBooking: () => void;
  onPaymentSuccess: () => void; // Add this new prop
  setIsProcessing:Dispatch<SetStateAction<boolean>>
}

interface window {
  Razorpay: any;
}
const RazorpayButton = ({
  date,
  timeSlot,
  duration,
  totalPrice,
  isProcessing,
  handleBooking,
  onPaymentSuccess,
  setIsProcessing
}: RazorpayButtonProps) => {
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  const handlePayment = async () => {
    setIsProcessing(true)
    const res = await loadRazorpayScript();
    if (!res) {
      alert("failed to load razorpay Script");
    }

    const order = await axios.post("/api/payment", { amount: totalPrice });

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.data.amount,
      currency: order.data.currency,
      name: "Mentee Connect",
      description: "Test transaction",
      order_id: order.data.id,
      handler: function (response: { razorpay_payment_id: string }) {
        onPaymentSuccess();
        const promise = Promise.resolve(handleBooking());
        toast.promise(promise, {
          loading: "Scheduling your session...",
          success: "Session booked successfully!",
          error: "Failed to book the session. Please try again.",
        });
      },
      prefill: {
        name: "Harshith",
        email: "harshithraiharsu@gmail.com",
        contact: "9567269803",
      },
      theme: {
        color: "#0A2540",
      },
    };

    const rzp = new (window as any).Razorpay(options);

    rzp.open();
  };
  return (
    <div>
      <Button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg mt-4 transition-all duration-300"
        onClick={handlePayment}
        disabled={!date || !timeSlot || !duration || isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Confirm & Pay"
        )}
      </Button>
    </div>
  );
};

export default RazorpayButton;
