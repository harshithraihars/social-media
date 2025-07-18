"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CompanyInfoForm from "./CompanyInfoForm";
import SkillsForm from "./SkillsForm";
import AboutForm from "./AboutForm";
import RateForm from "./RateForm";
import ProfileFormSkeleton from "./ProfileFormSkeleton";
export interface ProfileData {
  CompanyName: string;
  Role: string;
  skillInput: string;
  Skills: string[];
  About: string;
  Rate: string | number;
}

export interface ValidationErrors {
  CompanyName: boolean;
  Role: boolean;
  Skills: boolean;
  About: boolean;
  Rate: boolean;
}

export interface TouchedFields {
  CompanyName: boolean;
  Role: boolean;
  Skills: boolean;
  About: boolean;
  Rate: boolean;
}

interface ProfileEditProps {
  onClose?: () => void;
}

export default function ProfileEdit({ onClose }: ProfileEditProps) {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<ProfileData>({
    CompanyName: "",
    Role: "",
    skillInput: "",
    Skills: [],
    About: "",
    Rate: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({
    CompanyName: false,
    Role: false,
    Skills: false,
    About: false,
    Rate: false,
  });

  const [touched, setTouched] = useState<TouchedFields>({
    CompanyName: false,
    Role: false,
    Skills: false,
    About: false,
    Rate: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  // Fetch existing profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const res = await fetch(`/api/profile?userId=${user.id}`);

        if (res.ok) {
          const data = await res.json();

          if (data && data.profile) {
            // Populate form with existing data
            setFormData({
              CompanyName: data.profile.CompanyName || "",
              Role: data.profile.Role || "",
              skillInput: "",
              Skills: data.profile.Skills || [],
              About: data.profile.About || "",
              Rate: data.profile.Rate?.toString() || "",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user?.id]);

  // Validate form on data change
  useEffect(() => {
    const newErrors = {
      CompanyName: formData.CompanyName.trim() === "",
      Role: formData.Role.trim() === "",
      Skills: formData.Skills.length < 3,
      About:
        formData.About.trim().length < 50 || formData.About.trim().length > 100,
      Rate:
        formData.Rate.toString().trim() === "" || isNaN(Number(formData.Rate)),
    };

    setErrors(newErrors);
    setIsFormValid(!Object.values(newErrors).some((error) => error));
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const updateFormData = (updates: Partial<ProfileData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (!isFormValid) {
      return;
    }

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
          userId: user?.id,
          firstName: user?.firstName,
          lastName: user?.lastName,
          profilePhoto: user?.imageUrl,
        }),
      });

      const data = await res.json();
      if (window.location.pathname == "/Mentor") {
        window.location.reload();
      }

      if (res.ok) {
        if (onClose) {
          onClose();
        }
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <ProfileFormSkeleton />;
  }

  return (
    <div className="w-full max-w-2xl py-4 px-4 sm:px-4">
      <Card className="shadow-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 border-none overflow-hidden">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const promise = handleSubmit(e);
            toast.promise(promise, {
              loading: "Updating Profile...",
              success: "Profile Updated",
              error: "Failed to Update Profile",
            });
          }}
        >
          <CardContent className="space-y-4 p-6">
            <CompanyInfoForm
              formData={formData}
              handleChange={handleChange}
              handleBlur={handleBlur}
              errors={errors}
              touched={touched}
            />

            <SkillsForm
              formData={formData}
              updateFormData={updateFormData}
              handleBlur={handleBlur}
              errors={errors}
              touched={touched}
              setTouched={setTouched}
            />

            <AboutForm
              formData={formData}
              handleChange={handleChange}
              handleBlur={handleBlur}
              errors={errors}
              touched={touched}
            />

            <RateForm
              formData={formData}
              handleChange={handleChange}
              handleBlur={handleBlur}
              errors={errors}
              touched={touched}
              p
            />
          </CardContent>

          <CardFooter className="px-6 pb-6 pt-0">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-none shadow-md hover:shadow-lg transition-all duration-300"
              disabled={!isFormValid}
            >
              Save
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
