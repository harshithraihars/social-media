"use client";

import { useEffect, useState } from "react";
import BookingProgress from "./Booking-prgress";
import DateTimeSelector from "./DateTimeSelector";
import DurationSelector from "./DurationSelector";
import BookingSummary from "./BookingSummary";
import BookingConfirmation from "./BookingConfirmation";
import MentorInfo from "./MentorInfo";
import { ArrowRight, X, XCircle } from "lucide-react";
import axios from "axios";
import { IProfile } from "@/models/profile.model";
import { useUser } from "@clerk/nextjs";
import { useAppSelector } from "@/lib/hooks";
export default function ConfirmBooking({
  selectedMentor,
  setBookingPageOpen,
}: {
  selectedMentor: IProfile | null;
  setBookingPageOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const user=useAppSelector((state)=>state.counter.user)
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [duration, setDuration] = useState("30");
  const [selectedSlot, setselectedSlot] = useState<string | null>(null);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [mentorAvailability, setMentorAvailability] = useState(null);
  const handlePaymentSuccess = () => {
    setIsPaymentSuccessful(true);
  };
  const basePrice = duration === "30" ? 50 : 90;
  const discount = discountApplied ? basePrice * 0.1 : 0;
  const totalPrice = basePrice - discount;
  const menteeEmail = useUser().user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    if (selectedMentor) {
      try {
        const mentorAvailability = async () => {
          const response = await axios.get(
            `/api/mentor/${selectedMentor?._id}/availability`
          );
          const { availability } = response.data.availability;

          setMentorAvailability(availability);
        };
        mentorAvailability();
      } catch (error) {}
    }
  }, [selectedMentor]);

  const handleBooking = async () => {
    try {
      // const user = await getCurrentUser();

      const res = await axios.post("/api/mentee/booking", {
        mentorId: selectedMentor?._id,
        menteeId: user?._id,
        menteeEmail: menteeEmail,
        date,
        time: selectedSlot,
        Duration: duration,
        sessionAmount: totalPrice,
      });

      setIsProcessing(false);
      setIsBooked(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (isBooked) {
    return (
      <BookingConfirmation
        date={date}
        timeSlot={selectedSlot}
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
                date={date}
                timeSlot={selectedSlot}
                duration={duration}
                isPaymentComplete={isPaymentSuccessful || isBooked} // Updated logic
              />

              {/* Timeline steps with vertical line connector */}
              <div className="relative">
                <div className="mb-8 md:mb-12 relative">
                  <div className="flex w-full">
                    <div className="w-full md:ml-6 flex-1">
                      <h3 className="text-lg font-medium text-blue-700 dark:text-blue-400 mb-4">
                        Select Date & Time
                      </h3>
                      <DateTimeSelector
                        date={date}
                        setDate={setDate}
                        selectedSlot={selectedSlot}
                        setselectedSlot={setselectedSlot}
                        mentorAvailability={mentorAvailability}
                        selectedMentor={selectedMentor}
                      />
                    </div>
                  </div>
                </div>

                {/* Step 2: Session Duration */}
                <div className="mb-8 md:mb-12 relative">
                  <div className="flex w-full">
                    <div className="w-full md:ml-6 flex-1">
                      <h3 className="text-lg font-medium text-blue-700 dark:text-blue-400 mb-4">
                        Select Session Duration
                      </h3>
                      <DurationSelector
                        selectedMentor={selectedMentor}
                        duration={duration}
                        setDuration={setDuration}
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
            setIsProcessing={setIsProcessing}
            handleBooking={handleBooking}
            timeSlot={selectedSlot}
            onPaymentSuccess={handlePaymentSuccess} // Add this
          />
        </div>
      </div>
    </div>
  );
}
