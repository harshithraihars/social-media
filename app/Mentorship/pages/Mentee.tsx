"use client";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Search, Users, Briefcase, ChevronRight } from "lucide-react";
import MentorProfile from "./MentorProfile";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MentorCard } from "./MentorCard";
import ConfirmBooking from "./ConfirmBooking";
import AnimateOnScroll from "../Animation/Animate";
export type mentortype = {
  id: number;
  name: string;
  role: string;
  company: string;
  about: string;
  rating: number;
  image: string;
  hourlyRate: number;
  availability: string;
  expertise: string[];
};
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

const Mentee = () => {
  const [ComapnyName, setComapnyName] = useState("");
  const [Role, setRole] = useState("");
  const [selectedMentorId, setSelectedMentorId] = useState<number | null>(null);
  const [bookingPageOpen, setBookingPageOpen] = useState(false);
  const mentorprofileRef = useRef(null);
  const BookingPageRef = useRef(null);
  const handleCompanyChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setComapnyName(e.target.value);
    },
    []
  );

  const handleRoleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRole(e.target.value);
    },
    []
  );

  // Filter mentors based on search inputs
  const filteredMentors = useMemo(() => {
    return mentors.filter((mentor) => {
      return (
        (!ComapnyName ||
          mentor.company.toLowerCase().includes(ComapnyName.toLowerCase())) &&
        (!Role ||
          mentor.role.toLowerCase().includes(Role.toLowerCase()))
      );
    });
  }, [ComapnyName, Role]);

  const topMentors = useMemo(() => filteredMentors, [filteredMentors]);
  const recommendedMentors = useMemo(
    () => filteredMentors.slice(0, 2),
    [filteredMentors]
  );

  const selectedMentor = useMemo(() => {
    return mentors.find((mentor) => mentor.id === selectedMentorId) || null;
  }, [selectedMentorId]);

  const handleCardClick = (mentorId: number) => {
    setSelectedMentorId(mentorId);
  };

  const handleCloseProfile = () => {
    setSelectedMentorId(null);
  };

  useGSAP(() => {
    if (selectedMentorId) {
      gsap.to(mentorprofileRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(mentorprofileRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [selectedMentorId]);

  useGSAP(() => {
    if (bookingPageOpen) {
      gsap.to(BookingPageRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(BookingPageRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [bookingPageOpen]);

  const handleSearch=async()=>{
    const response=await fetch(`/api/mentors?ComapnyName=${ComapnyName}&Role=${Role}`)
    const data=await response.json()
    console.log(data);
    
  }
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white mx-2 md:mx-12 rounded-xl h-[160px] sm:h-[300px] lg:h-80 mt-5 md:mt-10">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <h2 className="text-lg sm:text-4xl font-bold mb-3 sm:mb-4 whitespace-nowrap">
                Let's find the Right mentor
              </h2>
              <p className="text-sm sm:text-xl mb-4 sm:mb-6">
                Connect with industry experts who can guide your career journey
              </p>
              <button className="bg-white text-blue-600 px-3 py-1.5 sm:px-6 sm:py-3 rounded-lg font-semibold transition-all duration-300 flex items-center whitespace-nowrap hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 hover:text-white hover:shadow-lg transform hover:scale-105">
                Explore Mentors
                <ChevronRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
            <div className="flex-1 flex justify-end">
              <img
                src="./mentor.png"
                alt="Mentor"
                loading="lazy"
                className="h-20 w-20 sm:h-60 sm:w-60 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div>
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 sm:flex-nowrap">
            {/* Company Search Input */}
            <div className="flex-1 min-w-[calc(50%-0.5rem)] sm:min-w-0 group">
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors duration-200 group-focus-within:text-blue-500" />
                <input
                  type="text"
                  placeholder="Search by company..."
                  value={ComapnyName}
                  onChange={handleCompanyChange}
                  className="w-full pl-12 pr-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg transition-all duration-200 ease-in-out placeholder:text-gray-400 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:bg-white"
                />
                <div className="absolute inset-0 border border-gray-200 rounded-lg pointer-events-none transition-opacity duration-200 opacity-0 group-hover:opacity-100" />
              </div>
            </div>

            {/* Role Search Input */}
            <div className="flex-1 min-w-[calc(50%-0.5rem)] sm:min-w-0 group">
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors duration-200 group-focus-within:text-blue-500" />
                <input
                  type="text"
                  placeholder="Search by role..."
                  value={Role}
                  onChange={handleRoleChange}
                  className="w-full pl-12 pr-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg transition-all duration-200 ease-in-out placeholder:text-gray-400 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:bg-white"
                />
                <div className="absolute inset-0 border border-gray-200 rounded-lg pointer-events-none transition-opacity duration-200 opacity-0 group-hover:opacity-100" />
              </div>
            </div>

            {/* Search Button */}
            <button className="flex items-center justify-center gap-2 px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full sm:w-auto"
            onClick={handleSearch}>
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>

          {/* Optional Search Tags/Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            {ComapnyName && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                Company: {ComapnyName}
                <button
                  onClick={() => setComapnyName("")}
                  className="hover:text-blue-900"
                >
                  ×
                </button>
              </span>
            )}
            {Role && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                Role: {Role}
                <button
                  onClick={() => setRole("")}
                  className="hover:text-blue-900"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
        <AnimateOnScroll>
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            {/* Dynamic layout that changes when a mentor is selected */}
            <div
              className={`transition-all duration-700 ease-in-out ${
                selectedMentorId
                  ? "grid grid-cols-1 lg:grid-cols-7 gap-6 max-h-[1000px]"
                  : ""
              }`}
            >
              {/* Left side: Mentor cards that stack vertically when one is selected */}
              <div
                className={`transition-all duration-700 ease-in-out ${
                  selectedMentorId
                    ? "lg:col-span-3 max-h-[1000px] overflow-y-auto pr-2"
                    : ""
                }`}
              >
                <section
                  className={`transition-all duration-500 ${
                    selectedMentorId ? "mb-6" : "mb-12"
                  }`}
                >
                  <h2
                    className={`text-2xl font-bold mb-6 sticky top-0 z-10 py-2 ${
                      selectedMentorId
                        ? "bg-gradient-to-r from-purple-300/85 to-indigo-200/75 backdrop-blur-md border border-white/20 shadow-md rounded-lg px-4"
                        : ""
                    }`}
                  >
                    Top Mentors
                  </h2>
                  <div
                    className={`transition-all duration-700 ease-in-out ${
                      selectedMentorId
                        ? "flex flex-col space-y-4"
                        : "flex flex-wrap gap-6 justify-start"
                    }`}
                  >
                    {topMentors.map((mentor) => (
                      <div
                        key={mentor.id}
                        className={`transition-all duration-700 transform ${
                          selectedMentorId && selectedMentorId !== mentor.id
                            ? "opacity-90"
                            : ""
                        }`}
                      >
                        <MentorCard
                          mentor={mentor}
                          isSelected={selectedMentorId === mentor.id}
                          onClick={() => handleCardClick(mentor.id)}
                          isCollapsed={selectedMentorId !== null}
                        />
                      </div>
                    ))}
                  </div>
                </section>

                {!selectedMentorId && (
                  <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-6">
                      Recommended for You
                    </h2>
                    <div className="flex flex-wrap gap-6 justify-start">
                      {recommendedMentors.map((mentor) => (
                        <MentorCard
                          key={`rec-${mentor.id}`}
                          mentor={mentor}
                          isSelected={false}
                          onClick={() => handleCardClick(mentor.id)}
                          isCollapsed={false}
                        />
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Right side: Mentor profile that appears when a card is selected */}
              {selectedMentorId && (
                <div className="transition-all duration-700 ease-in-out transform translate-x-0 opacity-100 animate-slideIn lg:col-span-4 max-h-[1000px] overflow-y-auto">
                  <MentorProfile
                    setMentorProfile={handleCloseProfile}
                    selectedMentor={selectedMentor}
                    OnClick={() => setBookingPageOpen(true)}
                  />
                </div>
              )}
            </div>
          </div>
        </AnimateOnScroll>
        {/* Mentor Listings with Animation */}
      </div>
      <div
        ref={mentorprofileRef}
        className="fixed top-4 z-10 w-full h-full bg-white pt-12 px-3 
           translate-y-full overflow-y-auto pb-20 md:hidden"
      >
        <MentorProfile
          setMentorProfile={handleCloseProfile}
          selectedMentor={selectedMentor}
          OnClick={() => setBookingPageOpen(true)}
        />
      </div>
      <div
        className="fixed top-4 z-10 w-screen md:w-3/4 h-full bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 pt-12  px-0 md:px-3 
           translate-y-full overflow-y-auto pb-20 "
        ref={BookingPageRef}
      >
        <ConfirmBooking
          selectedMentor={selectedMentor}
          setBookingPageOpen={setBookingPageOpen}
        />
      </div>
    </div>
  );
};

export default Mentee;
