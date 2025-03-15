import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";
import PaymentMethods from "./PaymentMethod";

interface PaymentSectionProps {
  discountCode: string;
  setDiscountCode: (code: string) => void;
  discountApplied: boolean;
  handleApplyDiscount: () => void;
}

export default function PaymentSection({
  discountCode,
  setDiscountCode,
  discountApplied,
  handleApplyDiscount,
}: PaymentSectionProps) {
  return (
    <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-lg p-4 shadow-sm">
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
    </div>
  );
}