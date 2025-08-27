import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ProfileData, ValidationErrors, TouchedFields } from "./EditProfile";

interface AboutFormProps {
  formData: ProfileData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur: (field: string) => void;
  errors: ValidationErrors;
  touched: TouchedFields;
}

export default function AboutForm({
  formData,
  handleChange,
  handleBlur,
  errors,
  touched,
}: AboutFormProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <Label htmlFor="About" className="text-sm font-medium">
          About
        </Label>
        <span
          className={`text-xs ${
            formData.About.length < 50 || formData.About.length > 100
              ? "text-red-500"
              : "text-indigo-600 dark:text-indigo-400"
          }`}
        >
          {formData.About.length}/100 characters
        </span>
      </div>
      <div className="h-24">
        <Textarea
          id="About"
          name="About"
          value={formData.About}
          onChange={handleChange}
          onBlur={() => handleBlur("About")}
          className={`bg-white/80 dark:bg-gray-800/80 ${
            errors.About && touched.About
              ? "border-red-500"
              : "border-indigo-200 dark:border-indigo-900"
          } h-16`}
          placeholder="Write a brief description About yourself (50-100 characters)"
          rows={2}
        />
        <div className="h-4 mt-1">
          {errors.About && touched.About && (
            <p className="text-xs text-red-500">
              About section must be between 50-100 characters
            </p>
          )}
        </div>
      </div>
    </div>
  );
}