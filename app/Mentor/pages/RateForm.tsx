import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileData, ValidationErrors, TouchedFields } from "./EditProfile";

interface RateFormProps {
  formData: ProfileData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur: (field: string) => void;
  errors: ValidationErrors;
  touched: TouchedFields;
}

export default function RateForm({
  formData,
  handleChange,
  handleBlur,
  errors,
  touched,
}: RateFormProps) {
  return (
    <div className="space-y-1">
      <Label htmlFor="Rate" className="text-sm font-medium">
        Hourly Rate (USD)
      </Label>
      <div className="h-14">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-500 dark:text-indigo-400 font-medium">
            $
          </span>
          <Input
            id="Rate"
            name="Rate"
            type="text"
            inputMode="numeric"
            value={formData.Rate}
            onChange={handleChange}
            onBlur={() => handleBlur("Rate")}
            className={`pl-7 bg-white/80 dark:bg-gray-800/80 ${
              errors.Rate && touched.Rate
                ? "border-red-500"
                : "border-indigo-200 dark:border-indigo-900"
            }`}
            placeholder="0.00"
          />
        </div>
        <div className="h-4 mt-1">
          {errors.Rate && touched.Rate && (
            <p className="text-xs text-red-500">
              Please enter a valid hourly rate
            </p>
          )}
        </div>
      </div>
    </div>
  );
}