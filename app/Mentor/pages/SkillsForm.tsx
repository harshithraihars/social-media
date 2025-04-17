import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { ProfileData, ValidationErrors, TouchedFields } from "./EditProfile";

interface SkillsFormProps {
  formData: ProfileData;
  updateFormData: (updates: Partial<ProfileData>) => void;
  handleBlur: (field: string) => void;
  errors: ValidationErrors;
  touched: TouchedFields;
  setTouched: React.Dispatch<React.SetStateAction<TouchedFields>>;
}

export default function SkillsForm({
  formData,
  updateFormData,
  handleBlur,
  errors,
  touched,
  setTouched,
}: SkillsFormProps) {
  // Predefined skill options
  const skillOptions = {
    programmingLanguages: [
      "JavaScript", "TypeScript", "Python", "Java", "C#", 
      "PHP", "Ruby", "Go", "Swift"
    ],
    frameworks: [
      "React", "Angular", "Vue.js", "Node.js", "Django", 
      "Flask", "Spring"
    ],
    softSkills: [
      "Communication", "Leadership", "Problem Solving", "Teamwork", 
      "Time Management", "Adaptability", "Creativity"
    ]
  };

  const addSkill = () => {
    if (formData.skillInput.trim() === "") return;

    setTouched((prev) => ({ ...prev, Skills: true }));

    if (!formData.Skills.includes(formData.skillInput.trim())) {
      updateFormData({
        Skills: [...formData.Skills, formData.skillInput.trim()],
        skillInput: ""
      });
    } else {
      toast({
        title: "Skill already added",
        description: "This skill is already in your list.",
        variant: "destructive",
      });
    }
  };

  const removeSkill = (skillToRemove: string) => {
    updateFormData({
      Skills: formData.Skills.filter((skill) => skill !== skillToRemove)
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  // Calculate remaining Skills needed
  const remainingSkills = Math.max(0, 3 - formData.Skills.length);

  return (
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
            updateFormData({ skillInput: e.target.value });
            setTouched((prev) => ({ ...prev, Skills: true }));
          }}
          onBlur={() => handleBlur("Skills")}
          onKeyDown={handleKeyDown}
          className="flex-1 h-10 px-3 py-2 rounded-md border border-indigo-200 dark:border-indigo-900 bg-white/80 dark:bg-gray-800/80 text-sm ring-offset-background"
        >
          <option value="">Select a skill</option>
          <optgroup label="Programming Languages">
            {skillOptions.programmingLanguages.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </optgroup>
          <optgroup label="Frameworks &amp; Libraries">
            {skillOptions.frameworks.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </optgroup>
          <optgroup label="Soft Skills">
            {skillOptions.softSkills.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
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
  );
}