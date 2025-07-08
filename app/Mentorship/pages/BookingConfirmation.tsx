import React, { useState, useEffect } from 'react';
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, CheckCircle, Eye, Sparkles } from "lucide-react";

interface BookingConfirmationProps {
  date: Date | undefined;
  timeSlot: string | null;
  duration: string;
  totalPrice: number;
}

export default function BookingConfirmation({
  date = new Date(),
  timeSlot,
  duration,
  totalPrice,
}: BookingConfirmationProps) {

  return (
    <div className="min-h-screen w-screen  dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-12 px-0 md:px-4">
      <div className="w-full px-4 sm:px-8 md:px-8 max-w-4xl mx-auto">

        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-green-100 dark:bg-green-900/30 rounded-full blur-xl opacity-60"></div>
            
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Your mentorship session has been successfully booked
          </p>
        </div>

        {/* Main Content Card */}
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-2xl shadow-blue-100/50 dark:shadow-slate-900/50 transition-all duration-300">
          <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
          <CardContent className="p-8">
            
            {/* Session Details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Session Details
              </h2>
              
              <div className="grid gap-6">
                <div className="flex items-center justify-between py-4 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Date & Time</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">When your session is scheduled</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {date && format(date, "MMMM d, yyyy")}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{timeSlot}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between py-4 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Duration</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">Length of your session</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900 dark:text-white">{duration} minutes</p>
                  </div>
                </div>

                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">$</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Total Amount</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">Payment completed successfully</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      ${totalPrice.toFixed(2)}
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">Paid</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
              <Button
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 rounded-lg py-6 text-base font-medium"
                onClick={() => window.location.reload()}
              >
                <Calendar className="h-5 w-5 mr-2" />
                Book Another Session
              </Button>
              
              <Button
                variant="outline"
                className="flex-1 border-2 border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 rounded-lg py-6 text-base font-medium"
                onClick={() => console.log('View bookings')}
              >
                <Eye className="h-5 w-5 mr-2" />
                View My Bookings
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-300 text-center">
                <span className="font-medium">What's next?</span> You'll receive a Email invite and meeting link 24 hours before your session.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}