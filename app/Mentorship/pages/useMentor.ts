// ./hooks/useMentorData.ts
import { useState, useMemo, useCallback } from "react";
import { mentortype } from "./types";

// Sample data - in a real app this would be fetched from an API
const mentors: mentortype[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Senior Product Manager",
    company: "Google",
    about:
      "Passionate about helping others grow in product management. 8+ years of experience in tech.",
    rating: 4.8,
    image: "./google.jpg",
    hourlyRate: 120,
    availability: "2 slots/week",
    expertise: ["python", "java", "aws"],
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Engineering Director",
    company: "Microsoft",
    about:
      "Technical leader with focus on scaling engineering teams and mentoring future leaders.",
    rating: 4.9,
    image: "./img2.jpg",
    hourlyRate: 150,
    availability: "3 slots/week",
    expertise: ["React Native", "Cloud", "aws"],
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "UX Design Lead",
    company: "Apple",
    about:
      "Helping designers bridge the gap between junior and senior roles. Design systems expert.",
    rating: 4.7,
    image: "./img3.jpg",
    hourlyRate: 100,
    availability: "4 slots/week",
    expertise: ["SpringBoot", "System Design", "Linux"],
  },
  {
    id: 4,
    name: "David Kim",
    role: "Frontend Developer",
    company: "Netflix",
    about:
      "Frontend specialist with expertise in React and modern UI frameworks. Passionate about mentoring junior developers.",
    rating: 4.6,
    image: "./img4.jpg",
    hourlyRate: 90,
    availability: "5 slots/week",
    expertise: ["React", "JavaScript", "CSS"],
  },
  {
    id: 5,
    name: "Emily Johnson",
    role: "Data Scientist",
    company: "Amazon",
    about:
      "Experienced data scientist helping others break into the field and develop specialized skills in ML and AI.",
    rating: 4.9,
    image: "./img5.jpg",
    hourlyRate: 130,
    availability: "2 slots/week",
    expertise: ["Python", "Machine Learning", "Data Analysis"],
  },
];

export function useMentorData(
  companyFilter: string,
  roleFilter: string, 
  selectedMentorId: number | null
) {
  // Filter mentors based on search inputs
  const filteredMentors = useMemo(() => {
    return mentors.filter((mentor) => {
      return (
        (!companyFilter ||
          mentor.company.toLowerCase().includes(companyFilter.toLowerCase())) &&
        (!roleFilter ||
          mentor.role.toLowerCase().includes(roleFilter.toLowerCase()))
      );
    });
  }, [companyFilter, roleFilter]);

  const recommendedMentors = useMemo(
    () => filteredMentors.slice(0, 2),
    [filteredMentors]
  );

  const selectedMentor = useMemo(() => {
    return mentors.find((mentor) => mentor.id === selectedMentorId) || null;
  }, [selectedMentorId]);

  const handleSearch = useCallback(async () => {
    try {
      const response = await fetch(`/api/mentors?companyName=${companyFilter}&role=${roleFilter}`);
      // Handle the response here
      const data = await response.json();
      console.log(data);
      // You could update state with the fetched data
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  }, [companyFilter, roleFilter]);

  return {
    filteredMentors,
    recommendedMentors,
    selectedMentor,
    handleSearch
  };
}