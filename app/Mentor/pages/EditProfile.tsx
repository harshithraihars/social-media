"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useAppSelector } from "@/lib/hooks";

interface ProfileEditProps {
  onClose?: () => void;
}

export default function ProfileEdit({ onClose }: ProfileEditProps) {

  const user=useAppSelector((state)=>state.counter.user)
  const [formData, setFormData] = useState({
    CompanyName: "",
    Role: "",
    skillInput: "",
    Skills: [] as string[],
    About: "",
    Rate: "",
  });

  const [errors, setErrors] = useState({
    CompanyName: false,
    Role: false,
    Skills: false,
    About: false,
    Rate: false,
  });

  const [touched, setTouched] = useState({
    CompanyName: false,
    Role: false,
    Skills: false,
    About: false,
    Rate: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form on data change
  useEffect(() => {
    const newErrors = {
      CompanyName: formData.CompanyName.trim() === "",
      Role: formData.Role.trim() === "",
      Skills: formData.Skills.length < 3,
      About:
        formData.About.trim().length < 50 || formData.About.trim().length > 100,
      Rate:
        formData.Rate.trim() === "" || isNaN(Number(formData.Rate)),
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

  const addSkill = () => {
    if (formData.skillInput.trim() === "") return;

    setTouched((prev) => ({ ...prev, Skills: true }));

    if (!formData.Skills.includes(formData.skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        Skills: [...prev.Skills, prev.skillInput.trim()],
        skillInput: "",
      }));
    } else {
      toast({
        title: "Skill already added",
        description: "This skill is already in your list.",
        variant: "destructive",
      });
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      Skills: prev.Skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      toast({
        title: "Please fix the errors",
        description: "All fields must be filled correctly before saving.",
        variant: "destructive",
      });

      return;
    }

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({formData,userId:user?.id}),
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    // toast({
    //   title: "Profile updated",
    //   description: "Your profile has been successfully updated.",
    // });

    // console.log("Form submitted:", formData);

    // // Close the modal if onClose function is provided
    // if (onClose) {
    //   onClose();
    // }
  };

  const Communication = "Communication";
  const Leadership = "Leadership";
  const ProblemSolving = "Problem Solving";
  const TimeManagement = "Time Management";
  const Python = "Python";
  const Java = "Java";
  const CSharp = "C#";
  const PHP = "PHP";
  const Ruby = "Ruby";

  // Calculate remaining Skills needed
  const remainingSkills = Math.max(0, 3 - formData.Skills.length);

  return (
    <div className="w-full max-w-2xl py-4 px-4 sm:px-4">
      <Card className="shadow-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 border-none overflow-hidden">
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 p-6">
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

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <Label htmlFor="skillInput" className="text-sm font-medium">
                  Skills
                </Label>
                {remainingSkills > 0 && (
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                    {remainingSkills} more skill
                    {remainingSkills !== 1 ? "s" : ""} needed
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <select
                  id="skillInput"
                  name="skillInput"
                  value={formData.skillInput}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      skillInput: e.target.value,
                    }));
                    setTouched((prev) => ({ ...prev, skills: true }));
                  }}
                  onBlur={() => handleBlur("skills")}
                  onKeyDown={handleKeyDown}
                  className="flex-1 h-10 px-3 py-2 rounded-md border border-indigo-200 dark:border-indigo-900 bg-white/80 dark:bg-gray-800/80 text-sm ring-offset-background"
                >
                  <option value="">Select a skill</option>
                  <optgroup label="Programming Languages">
                    <option value="JavaScript">JavaScript</option>
                    <option value="TypeScript">TypeScript</option>
                    <option value={Python}>{Python}</option>
                    <option value={Java}>{Java}</option>
                    <option value={CSharp}>{CSharp}</option>
                    <option value={PHP}>{PHP}</option>
                    <option value={Ruby}>{Ruby}</option>
                    <option value="Go">Go</option>
                    <option value="Swift">Swift</option>
                  </optgroup>
                  <optgroup label="Frameworks &amp; Libraries">
                    <option value="React">React</option>
                    <option value="Angular">Angular</option>
                    <option value="Vue.js">Vue.js</option>
                    <option value="Node.js">Node.js</option>
                    <option value="Django">Django</option>
                    <option value="Flask">Flask</option>
                    <option value="Spring">Spring</option>
                  </optgroup>
                  <optgroup label="Soft Skills">
                    <option value={Communication}>{Communication}</option>
                    <option value={Leadership}>{Leadership}</option>
                    <option value={ProblemSolving}>{ProblemSolving}</option>
                    <option value="Teamwork">Teamwork</option>
                    <option value={TimeManagement}>{TimeManagement}</option>
                    <option value="Adaptability">Adaptability</option>
                    <option value="Creativity">Creativity</option>
                  </optgroup>
                </select>
                <Button
                  type="button"
                  onClick={addSkill}
                  variant="secondary"
                  className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-100 dark:hover:bg-indigo-800"
                >
                  Add
                </Button>
              </div>
              <div className="h-16">
                {formData.Skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.Skills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 px-3 py-1 text-sm bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-white/20 transition-colors"
                        >
                          <X className="w-3 h-3" />
                          <span className="sr-only">Remove {skill}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="h-4 mt-1">
                  {errors.Skills && touched.Skills && (
                    <p className="text-xs text-red-500">
                      Add at least 3 skills
                    </p>
                  )}
                </div>
              </div>
            </div>

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
