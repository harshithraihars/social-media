import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, Clock, CheckCircle } from "lucide-react";

interface BookingConfirmationProps {
  date: Date | undefined;
  timeSlot: string | null;
  duration: string;
  totalPrice: number;
}

export default function BookingConfirmation({
  date,
  timeSlot,
  duration,
  totalPrice,
}: BookingConfirmationProps) {
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