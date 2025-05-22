"use client";

import { useState } from "react";
import BookingProgress from "./Booking-prgress";
import DateTimeSelector from "./DateTimeSelector";
import DurationSelector from "./DurationSelector";
import PaymentSection from "./PaymentSection";
import BookingSummary from "./BookingSummary";
import BookingConfirmation from "./BookingConfirmation";
import MentorInfo from "./MentorInfo";
import { ArrowRight, X, XCircle } from "lucide-react";
import Mentee, { IMentor } from "./Mentee";
import { getCurrentUser } from "@/lib/serveractions";
import axios from "axios";
export default function ConfirmBooking({
  selectedMentor,
  setBookingPageOpen,
}: {
  selectedMentor: IMentor | null;
  setBookingPageOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [duration, setDuration] = useState("30");
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [timezone, setTimezone] = useState("UTC");
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const basePrice = duration === "30" ? 50 : 90;
  const discount = discountApplied ? basePrice * 0.1 : 0;
  const totalPrice = basePrice - discount;

  const handleApplyDiscount = () => {
    if (discountCode.toLowerCase() === "mentor10") {
      setDiscountApplied(true);
    }
  };

  const handleBooking = async () => {
    setIsProcessing(true);
    const user = await getCurrentUser();

    const res = await axios.post("/api/booking", {
      mentorId: selectedMentor?._id,
      menteeId: user._id,
      date,
      time: timeSlot,
      Duration: duration,
      sessionAmount: totalPrice,
    });
    setIsProcessing(false);
    setIsBooked(true);
  };

  if (isBooked) {
    return (
      <BookingConfirmation
        date={date}
        timeSlot={timeSlot}
        duration={duration}
        totalPrice={totalPrice}
      />
    );
  }

  return (
    <div className="container mx-auto py-8 px-0 md:px-8 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 min-h-screen w-full">
      <div className="grid md:grid-cols-3 gap-4 md:gap-8 w-full">
        <div className="md:col-span-1 order-2 md:order-1 px-4 md:px-0">
          <div className="md:sticky md:top-4 space-y-6">
            <MentorInfo selectedMentor={selectedMentor} />
          </div>
        </div>

        <div className="md:col-span-2 order-1 md:order-2 space-y-6 px-4 md:px-0 w-full">
          <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 w-full">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Book a Session
                </h2>
                <ArrowRight
                  className="text-gray-500 hover:text-gray-800 cursor-pointer"
                  size={30}
                  onClick={() => setBookingPageOpen(false)}
                />
              </div>

              <BookingProgress
                currentStep={!date ? 0 : !timeSlot ? 0 : !duration ? 1 : 2}
                steps={["Select Date & Time", "Select Duration", "Payment"]}
              />

              {/* Timeline steps with vertical line connector */}
              <div className="relative">
                <div className="absolute left-[22px] top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300 dark:from-blue-600 dark:via-blue-500 dark:to-blue-400 hidden md:block"></div>

                {/* Step 1: Date & Time */}
                <div className="mb-8 md:mb-12 relative">
                  <div className="flex w-full">
                    <div className="relative z-10 hidden md:block">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium shadow-md">
                        1
                      </div>
                    </div>
                    <div className="w-full md:ml-6 flex-1">
                      <h3 className="text-lg font-medium text-blue-700 dark:text-blue-400 mb-4">
                        Select Date & Time
                      </h3>
                      <DateTimeSelector
                        date={date}
                        setDate={setDate}
                        timezone={timezone}
                        setTimezone={setTimezone}
                        timeSlot={timeSlot}
                        setTimeSlot={setTimeSlot}
                      />
                    </div>
                  </div>
                </div>

                {/* Step 2: Session Duration */}
                <div className="mb-8 md:mb-12 relative">
                  <div className="flex w-full">
                    <div className="relative z-10 hidden md:block">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium shadow-md">
                        2
                      </div>
                    </div>
                    <div className="w-full md:ml-6 flex-1">
                      <h3 className="text-lg font-medium text-blue-700 dark:text-blue-400 mb-4">
                        Select Session Duration
                      </h3>
                      <DurationSelector
                        duration={duration}
                        setDuration={setDuration}
                      />
                    </div>
                  </div>
                </div>

                {/* Step 3: Payment */}
                <div className="relative">
                  <div className="flex w-full">
                    <div className="relative z-10 hidden md:block">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium shadow-md">
                        3
                      </div>
                    </div>
                    <div className="w-full md:ml-6 flex-1">
                      <h3 className="text-lg font-medium text-blue-700 dark:text-blue-400 mb-4">
                        Payment
                      </h3>
                      <PaymentSection
                        discountCode={discountCode}
                        setDiscountCode={setDiscountCode}
                        discountApplied={discountApplied}
                        handleApplyDiscount={handleApplyDiscount}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <BookingSummary
            date={date}
            duration={duration}
            basePrice={basePrice}
            discount={discount}
            totalPrice={totalPrice}
            discountApplied={discountApplied}
            isProcessing={isProcessing}
            handleBooking={handleBooking}
            timeSlot={timeSlot}
          />
        </div>
      </div>
    </div>
  );
}
