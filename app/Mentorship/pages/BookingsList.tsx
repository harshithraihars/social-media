"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookingCard } from "./BookingCard";
// import { Booking } from "./BookingCard";
import React from "react";
import { BookingI } from "./MentorShipHeader";

interface BookingsListProps {
  bookingsRef: React.RefObject<HTMLDivElement>;
  bookings: BookingI[];
  onClose: () => void;
}

export const BookingsList = ({ bookingsRef, bookings, onClose }: BookingsListProps) => {
  
  const [joinInputStates, setJoinInputStates] = useState<Record<string, string>>({});

  

  const handleJoinSession = (bookingId: string) => {
    // const joinCode = joinInputStates[bookingId];
    // // Here you would handle the actual joining logic with the joinCode
    // console.log(`Joining session ${bookingId} with code: ${joinCode}`);

    // // Clear the join input after joining
    // setJoinInputStates((prev) => {
    //   const newState = { ...prev };
    //   delete newState[bookingId];
    //   return newState;
    // });
  };

  return (
    <motion.div
      ref={bookingsRef}
      initial={{ opacity: 0, x: 20, y: 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      className="absolute top-20 right-0 sm:right-8 lg:right-0 z-50 w-full max-w-md max-h-screen md:max-h-[80vh] overflow-y-auto bg-gradient-to-br to-gray-700 rounded-lg shadow-2xl border border-gray-200"
      style={{
        boxShadow:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div className="sticky top-0 bg-gradient-to-br to-gray-700 z-10 px-4 py-3 border-b flex justify-between items-center">
        <h3 className="font-medium text-lg flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Your Bookings
        </h3>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-8 w-8 hover:bg-gray-100"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-3 space-y-3">
        {bookings?.length > 0 ? (
          bookings?.map((booking) => (
            <motion.div
              key={booking.date}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 2* 0.05 }}
            >
              <BookingCard
                booking={booking}
                // joinInputState={joinInputStates[booking.id]}
                onJoinSession={() => handleJoinSession(booking.id)}
                onJoinInputChange={(value) =>
                  setJoinInputStates((prev) => ({
                    ...prev,
                    [booking.id]: value,
                  }))
                }
              />
            </motion.div>
          ))
        ) : (
          <Card>
            <div className="pt-6 pb-6 flex flex-col items-center justify-center min-h-[150px]">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
              <p className="text-center text-muted-foreground">
                No bookings found
              </p>
              <Button variant="outline" className="mt-4">
                Book Your First Session
              </Button>
            </div>
          </Card>
        )}
      </div>
    </motion.div>
  );
};