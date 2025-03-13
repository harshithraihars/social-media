"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Clock,
  CalendarIcon,
  CheckCircle,
  Loader2,
  Sparkles,
  Star,
  Users,
  Award,
} from "lucide-react";
import Image from "next/image";
import TimeSlots from "./TimeSlot";
import PaymentMethods from "./PaymentMethod";

export default function ConfirmBooking() {
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

  const handleBooking = () => {
    if (!date || !timeSlot || !duration) return;

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsBooked(true);
    }, 2000);
  };

  if (isBooked) {
    return (
      <div className="container max-w-6xl mx-auto py-12 px-0 md:px-4">
        <Card className="w-full max-w-3xl mx-auto overflow-hidden border-0 shadow-xl bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 transition-all duration-300">
          <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-75 blur-lg"></div>
              <CheckCircle className="relative h-16 w-16 text-green-500 mb-4" />
            </div>
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Booking Confirmed!
            </h2>
            <p className="text-muted-foreground mb-6">
              Your mentorship session has been successfully booked.
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-6 rounded-xl w-full max-w-md shadow-sm border border-blue-100 dark:border-blue-900/50">
              <p className="font-medium text-blue-800 dark:text-blue-300 mb-3">
                Session Details:
              </p>
              <p className="text-muted-foreground mb-1 flex items-center justify-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                {date && format(date, "MMMM d, yyyy")} at {timeSlot}
              </p>
              <p className="text-muted-foreground mb-4 flex items-center justify-center gap-2">
                <Clock className="h-4 w-4" />
                Duration: {duration} minutes
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-blue-200 dark:via-blue-800 to-transparent my-3"></div>
              <p className="font-medium text-lg text-blue-800 dark:text-blue-300 mt-2">
                Total Paid: ${totalPrice.toFixed(2)}
              </p>
            </div>
            <Button
              className="mt-8 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 rounded-lg px-6"
              onClick={() => window.location.reload()}
            >
              Book Another Session
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto py-8 px-0 md:px-4 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 min-h-screen rounded-xl">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 dark:shadow-gray-900/30 hidden md:block">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <CardContent className="pt-6 relative bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:bg-gray-900">
              <div className="absolute top-0 right-0 bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-md">
                TOP RATED
              </div>
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative w-28 h-28 rounded-full overflow-hidden mb-4 border-4 border-white dark:border-gray-800 shadow-lg group">
                  <Image
                    src="/placeholder.svg?height=112&width=112"
                    alt="Mentor profile"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent"></div>
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Dr. Sarah Johnson
                </h2>
                <p className="text-sm text-muted-foreground">
                  Senior Product Design Mentor
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 text-blue-800 dark:text-blue-300 text-xs px-3 py-1 rounded-full font-medium shadow-sm transform hover:scale-105 transition-transform duration-200">
                    UX Design
                  </span>
                  <span className="bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50 text-purple-800 dark:text-purple-300 text-xs px-3 py-1 rounded-full font-medium shadow-sm transform hover:scale-105 transition-transform duration-200">
                    Product Strategy
                  </span>
                </div>
                <div className="flex items-center mt-3 text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-1 text-xs text-gray-600 dark:text-gray-400">
                    (127 reviews)
                  </span>
                </div>
              </div>
              <div className="space-y-5">
                <div>
                  <h3 className="font-medium flex items-center text-blue-700 dark:text-blue-400">
                    <Users className="h-4 w-4 mr-2" />
                    About
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    With over 10 years of experience in product design at
                    leading tech companies, I help designers and product
                    managers level up their skills and advance their careers.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium flex items-center text-blue-700 dark:text-blue-400">
                    <Award className="h-4 w-4 mr-2" />
                    Expertise
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-2 mt-2">
                    <li className="flex items-center transform hover:translate-x-1 transition-transform duration-200">
                      <Sparkles className="h-3 w-3 text-blue-500 dark:text-blue-400 mr-2" />
                      UX/UI Design Best Practices
                    </li>
                    <li className="flex items-center transform hover:translate-x-1 transition-transform duration-200">
                      <Sparkles className="h-3 w-3 text-blue-500 dark:text-blue-400 mr-2" />
                      Design Systems
                    </li>
                    <li className="flex items-center transform hover:translate-x-1 transition-transform duration-200">
                      <Sparkles className="h-3 w-3 text-blue-500 dark:text-blue-400 mr-2" />
                      Product Strategy
                    </li>
                    <li className="flex items-center transform hover:translate-x-1 transition-transform duration-200">
                      <Sparkles className="h-3 w-3 text-blue-500 dark:text-blue-400 mr-2" />
                      Career Development
                    </li>
                    <li className="flex items-center transform hover:translate-x-1 transition-transform duration-200">
                      <Sparkles className="h-3 w-3 text-blue-500 dark:text-blue-400 mr-2" />
                      Portfolio Reviews
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-4 rounded-xl mt-4 shadow-sm border border-blue-100 dark:border-blue-900/50 transform hover:scale-102 transition-transform duration-300">
                  <p className="text-sm text-center text-blue-700 dark:text-blue-400 font-medium">
                    "Sarah's mentorship completely transformed my design career.
                    Her insights were invaluable!"
                  </p>
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
                    — Michael T., Product Designer
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6 ">
          <Card className="border-0 shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-blue-900/20 dark:to-blue-800/10">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Book a Session
              </h2>

              <div className="space-y-8">
                <div className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <h3 className="text-base font-medium mb-4 flex items-center text-blue-700 dark:text-blue-400">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white mr-2 text-sm shadow-sm">
                      1
                    </span>
                    Select Date & Time
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-300">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border-0 bg-transparent"
                        disabled={(date) => {
                          // Disable past dates and weekends
                          return (
                            date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                            date.getDay() === 0 ||
                            date.getDay() === 6
                          );
                        }}
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/20 dark:to-blue-800/10 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
                        <p className="text-sm font-medium flex items-center text-blue-700 dark:text-blue-400">
                          <CalendarIcon className="mr-2 h-4 w-4 text-blue-500" />
                          {date
                            ? format(date, "MMMM d, yyyy")
                            : "Select a date"}
                        </p>
                        <div className="flex items-center">
                          <Select value={timezone} onValueChange={setTimezone}>
                            <SelectTrigger className="w-[140px] border-blue-200 dark:border-blue-800 focus:ring-blue-300 bg-white dark:bg-gray-800 hover:border-blue-300 transition-all duration-300">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="UTC">UTC</SelectItem>
                              <SelectItem value="EST">EST (UTC-5)</SelectItem>
                              <SelectItem value="PST">PST (UTC-8)</SelectItem>
                              <SelectItem value="IST">
                                IST (UTC+5:30)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <TimeSlots
                        selectedDate={date}
                        selectedSlot={timeSlot}
                        onSelectTimeSlot={setTimeSlot}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <h3 className="text-base font-medium mb-4 flex items-center text-blue-700 dark:text-blue-400">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white mr-2 text-sm shadow-sm">
                      2
                    </span>
                    Select Session Duration
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className={`border rounded-lg p-5 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
                        duration === "30"
                          ? "border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 shadow-sm"
                          : "hover:border-blue-300 dark:hover:border-blue-700"
                      }`}
                      onClick={() => setDuration("30")}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">
                          <Clock className="h-5 w-5" />
                        </div>
                        <span className="font-medium text-blue-700 dark:text-blue-400">
                          30 minutes
                        </span>
                      </div>
                      <div className="mt-3 flex items-baseline gap-1">
                        <p className="text-lg font-bold">$50</p>
                        <p className="text-xs text-muted-foreground">
                          /session
                        </p>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Quick advice & specific questions
                      </p>
                      {duration === "30" && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle className="h-5 w-5 text-blue-500" />
                        </div>
                      )}
                    </div>
                    <div
                      className={`border rounded-lg p-5 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
                        duration === "60"
                          ? "border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 shadow-sm"
                          : "hover:border-blue-300 dark:hover:border-blue-700"
                      }`}
                      onClick={() => setDuration("60")}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">
                          <Clock className="h-5 w-5" />
                        </div>
                        <span className="font-medium text-blue-700 dark:text-blue-400">
                          60 minutes
                        </span>
                      </div>
                      <div className="mt-3 flex items-baseline gap-1">
                        <p className="text-lg font-bold">$90</p>
                        <p className="text-xs text-muted-foreground">
                          /session
                        </p>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        In-depth discussion & portfolio review
                      </p>
                      {duration === "60" && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle className="h-5 w-5 text-blue-500" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <h3 className="text-base font-medium mb-4 flex items-center text-blue-700 dark:text-blue-400">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white mr-2 text-sm shadow-sm">
                      3
                    </span>
                    Payment
                  </h3>
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-4 transition-all duration-300 hover:shadow-md">
                    <PaymentMethods />
                  </div>

                  <div className="mt-4 flex gap-2">
                    <div className="flex-1">
                      <Input
                        placeholder="Discount code"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        disabled={discountApplied}
                        className="border-blue-200 dark:border-blue-800 focus:border-blue-500 focus:ring-blue-300 transition-all duration-300 hover:border-blue-300"
                      />
                    </div>
                    <Button
                      variant={discountApplied ? "outline" : "secondary"}
                      onClick={handleApplyDiscount}
                      disabled={discountApplied || !discountCode}
                      className={`transition-all duration-300 ${
                        discountApplied
                          ? "bg-green-100 text-green-700 border-green-300 hover:bg-green-100"
                          : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-md transform hover:translate-y-px hover:from-blue-600 hover:to-blue-700"
                      }`}
                    >
                      {discountApplied ? "Applied" : "Apply"}
                    </Button>
                  </div>

                  {discountApplied && (
                    <div className="text-sm text-green-600 mt-2 flex items-center p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      10% discount applied successfully!
                    </div>
                  )}

                  <div className="mt-6">
                    <Button className="w-full bg-blue-400 hover:bg-blue-500 text-white font-medium py-6 rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-y-px">
                      Complete Booking
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900 m-4 md:m-0">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Booking Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-blue-500" />
                    <span>Date & Time</span>
                  </div>
                  <span className="font-medium">
                    {date ? format(date, "MMM d, yyyy") : "Not selected"}{" "}
                    {timeSlot ? `at ${timeSlot}` : ""}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span>Duration</span>
                  </div>
                  <span className="font-medium">{duration} minutes</span>
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span>Base Price</span>
                    <span>${basePrice.toFixed(2)}</span>
                  </div>
                  {discountApplied && (
                    <div className="flex justify-between items-center text-green-600 mb-2">
                      <span>Discount (10%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="h-px bg-gradient-to-r from-transparent via-blue-200 dark:via-blue-800 to-transparent my-3"></div>
                  <div className="flex justify-between items-center font-bold mt-2 text-lg">
                    <span>Total</span>
                    <span className="text-blue-700 dark:text-blue-400">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 rounded-lg mt-4"
                  size="lg"
                  onClick={handleBooking}
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
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mt-4 text-center">
                  <p className="text-xs text-center text-muted-foreground">
                    By booking, you agree to our{" "}
                    <a
                      href="#"
                      className="underline text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="underline text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    >
                      Cancellation Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
