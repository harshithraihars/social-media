"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, CalendarIcon, CheckCircle, Loader2 } from "lucide-react"
import Image from "next/image"
import TimeSlots from "./TimeSlot"
import PaymentMethods from "./PaymentMethod"

export default function ConfirmBooking() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [duration, setDuration] = useState("30")
  const [timeSlot, setTimeSlot] = useState<string | null>(null)
  const [timezone, setTimezone] = useState("UTC")
  const [discountCode, setDiscountCode] = useState("")
  const [discountApplied, setDiscountApplied] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isBooked, setIsBooked] = useState(false)

  const basePrice = duration === "30" ? 50 : 90
  const discount = discountApplied ? basePrice * 0.1 : 0
  const totalPrice = basePrice - discount

  const handleApplyDiscount = () => {
    if (discountCode.toLowerCase() === "mentor10") {
      setDiscountApplied(true)
    }
  }

  const handleBooking = () => {
    if (!date || !timeSlot || !duration) return

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsBooked(true)
    }, 2000)
  }

  if (isBooked) {
    return (
      <div className="container max-w-6xl mx-auto py-12 px-4">
        <Card className="w-full max-w-3xl mx-auto">
          <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[400px] text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
            <p className="text-muted-foreground mb-6">Your mentorship session has been successfully booked.</p>
            <div className="bg-gray-50 p-4 rounded-lg w-full max-w-md">
              <p className="font-medium">Session Details:</p>
              <p className="text-muted-foreground">
                {date && format(date, "MMMM d, yyyy")} at {timeSlot}
              </p>
              <p className="text-muted-foreground">Duration: {duration} minutes</p>
              <p className="font-medium mt-2">Total Paid: ${totalPrice.toFixed(2)}</p>
            </div>
            <Button className="mt-6" onClick={() => window.location.reload()}>
              Book Another Session
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                  <Image src="/placeholder.svg?height=96&width=96" alt="Mentor profile" fill className="object-cover" />
                </div>
                <h2 className="text-xl font-bold">Dr. Sarah Johnson</h2>
                <p className="text-sm text-muted-foreground">Senior Product Design Mentor</p>
                <div className="flex gap-2 mt-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">UX Design</span>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Product Strategy</span>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">About</h3>
                <p className="text-sm text-muted-foreground">
                  With over 10 years of experience in product design at leading tech companies, I help designers and
                  product managers level up their skills and advance their careers.
                </p>
                <h3 className="font-medium">Expertise</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• UX/UI Design Best Practices</li>
                  <li>• Design Systems</li>
                  <li>• Product Strategy</li>
                  <li>• Career Development</li>
                  <li>• Portfolio Reviews</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">Book a Session</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium mb-2">1. Select Date & Time</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                        disabled={(date) => {
                          // Disable past dates and weekends
                          return (
                            date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                            date.getDay() === 0 ||
                            date.getDay() === 6
                          )
                        }}
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">{date ? format(date, "MMMM d, yyyy") : "Select a date"}</p>
                        <div className="flex items-center">
                          <Select value={timezone} onValueChange={setTimezone}>
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="UTC">UTC</SelectItem>
                              <SelectItem value="EST">EST (UTC-5)</SelectItem>
                              <SelectItem value="PST">PST (UTC-8)</SelectItem>
                              <SelectItem value="IST">IST (UTC+5:30)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <TimeSlots selectedDate={date} selectedSlot={timeSlot} onSelectTimeSlot={setTimeSlot} />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-2">2. Select Session Duration</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        duration === "30" ? "border-primary bg-primary/5" : "hover:border-gray-400"
                      }`}
                      onClick={() => setDuration("30")}
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <span className="font-medium">30 minutes</span>
                      </div>
                      <p className="mt-2 text-lg font-bold">$50</p>
                      <p className="text-xs text-muted-foreground">Quick advice & specific questions</p>
                    </div>
                    <div
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        duration === "60" ? "border-primary bg-primary/5" : "hover:border-gray-400"
                      }`}
                      onClick={() => setDuration("60")}
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <span className="font-medium">60 minutes</span>
                      </div>
                      <p className="mt-2 text-lg font-bold">$90</p>
                      <p className="text-xs text-muted-foreground">In-depth discussion & portfolio review</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-2">3. Payment</h3>
                  <PaymentMethods />

                  <div className="mt-4 flex gap-2">
                    <div className="flex-1">
                      <Input
                        placeholder="Discount code"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        disabled={discountApplied}
                      />
                    </div>
                    <Button
                      variant={discountApplied ? "outline" : "secondary"}
                      onClick={handleApplyDiscount}
                      disabled={discountApplied || !discountCode}
                    >
                      {discountApplied ? "Applied" : "Apply"}
                    </Button>
                  </div>

                  {discountApplied && <p className="text-sm text-green-600 mt-1">10% discount applied!</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span>Date & Time</span>
                  </div>
                  <span className="font-medium">
                    {date ? format(date, "MMM d, yyyy") : "Not selected"} {timeSlot ? `at ${timeSlot}` : ""}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Duration</span>
                  </div>
                  <span className="font-medium">{duration} minutes</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span>Base Price</span>
                    <span>${basePrice.toFixed(2)}</span>
                  </div>
                  {discountApplied && (
                    <div className="flex justify-between items-center text-green-600">
                      <span>Discount (10%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center font-bold mt-2 text-lg">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  className="w-full"
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
                <p className="text-xs text-center text-muted-foreground">
                  By booking, you agree to our{" "}
                  <a href="#" className="underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="underline">
                    Cancellation Policy
                  </a>
                  .
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

