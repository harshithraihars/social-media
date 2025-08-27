import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import RazorpayButton from "../../payment/RazorpayButton";
import { Dispatch, SetStateAction } from "react";
interface BookingSummaryProps {
  date: Date | undefined;
  timeSlot: string | null;
  duration: string;
  totalPrice: number;
  isProcessing: boolean;
  handleBooking: () => void;
  onPaymentSuccess: () => void; // Add this
  setIsProcessing:Dispatch<SetStateAction<boolean>>
}
export default function BookingSummary({
  date,
  timeSlot,
  duration,
  totalPrice,
  isProcessing,
  handleBooking,
  onPaymentSuccess,
  setIsProcessing
}: BookingSummaryProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6 text-blue-600 dark:text-blue-400">
          Booking Summary
        </h2>

        <div className="space-y-4">
          {/* Date & Time section */}
          <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <CalendarIcon className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Date & Time</span>
            </div>
            <span>
              {date ? format(date, "MMM d, yyyy") : "Not selected"}
              {timeSlot ? ` at ${timeSlot}` : ""}
            </span>
          </div>

          {/* Duration section */}
          <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Duration</span>
            </div>
            <span>{duration} minutes</span>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 dark:bg-gray-700 my-4"></div>

          {/* Price breakdown */}
          <div className="space-y-3">
            {/* Total price */}
            <div className="flex justify-between items-center font-bold text-lg pt-2">
              <span>Total</span>
              <span className="text-blue-600 dark:text-blue-400">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          <RazorpayButton
            date={date}
            timeSlot={timeSlot}
            totalPrice={totalPrice}
            handleBooking={handleBooking}
            duration={duration}
            isProcessing={isProcessing}
            onPaymentSuccess={onPaymentSuccess} // Add this
            setIsProcessing={setIsProcessing}
          />

          {/* Terms notice */}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              By booking, you agree to our{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
              >
                Cancellation Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
