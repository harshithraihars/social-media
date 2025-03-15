import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, CheckCircle, Loader2 } from "lucide-react";

interface BookingSummaryProps {
  date: Date | undefined;
  timeSlot: string | null;
  duration: string;
  basePrice: number;
  discount: number;
  totalPrice: number;
  discountApplied: boolean;
  isProcessing: boolean;
  handleBooking: () => void;
}

export default function BookingSummary({
  date,
  timeSlot,
  duration,
  basePrice,
  discount,
  totalPrice,
  discountApplied,
  isProcessing,
  handleBooking,
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
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                Base Price
              </span>
              <span>${basePrice.toFixed(2)}</span>
            </div>

            {discountApplied && (
              <div className="flex justify-between items-center text-green-600">
                <span className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Discount (10%)
                </span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}

            {/* Total price */}
            <div className="flex justify-between items-center font-bold text-lg pt-2">
              <span>Total</span>
              <span className="text-blue-600 dark:text-blue-400">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Confirm button */}
          <Button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg mt-4 transition-all duration-300"
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