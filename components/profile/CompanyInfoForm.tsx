import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileData, ValidationErrors, TouchedFields } from "./EditProfile";

interface CompanyInfoFormProps {
  formData: ProfileData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur: (field: string) => void;
  errors: ValidationErrors;
  touched: TouchedFields;
}

export default function CompanyInfoForm({
  formData,
  handleChange,
  handleBlur,
  errors,
  touched,
}: CompanyInfoFormProps) {
  return (
    <>
      <div className="space-y-1">
        <Label htmlFor="CompanyName" className="text-sm font-medium">
          Company Name
        </Label>
        <div className="h-14">
          <Input
            id="CompanyName"
            name="CompanyName"
            value={formData.CompanyName}
            onChange={handleChange}
            onBlur={() => handleBlur("CompanyName")}
            className={`bg-white/80 dark:bg-gray-800/80 ${
              errors.CompanyName && touched.CompanyName
                ? "border-red-500"
                : "border-indigo-200 dark:border-indigo-900"
            }`}
            placeholder="Enter your company name"
          />
          <div className="h-4 mt-1">
            {errors.CompanyName && touched.CompanyName && (
              <p className="text-xs text-red-500">
                Company name is required
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="Role" className="text-sm font-medium">
          Job Role
        </Label>
        <div className="h-14">
          <Input
            id="Role"
            name="Role"
            value={formData.Role}
            onChange={handleChange}
            onBlur={() => handleBlur("Role")}
            className={`bg-white/80 dark:bg-gray-800/80 ${
              errors.Role && touched.Role
                ? "border-red-500"
                : "border-indigo-200 dark:border-indigo-900"
            }`}
            placeholder="Enter your job role"
          />
          <div className="h-4 mt-1">
            {errors.Role && touched.Role && (
              <p className="text-xs text-red-500">Job role is required</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}