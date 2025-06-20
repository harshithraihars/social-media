"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Search, Users, Briefcase, ChevronRight, Loader2 } from "lucide-react";
import MentorProfile from "./MentorProfile";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MentorCard } from "./MentorCard";
import ConfirmBooking from "./ConfirmBooking";
import AnimateOnScroll from "../Animation/Animate";
import { IUser } from "@/models/user.model";
import { IProfile } from "@/models/profile.model";
import mongoose from "mongoose";
import axios from "axios";

// Define a Mentor type that includes the user and profile information
export interface IMentor extends IUser {
  _id: mongoose.ObjectId;
  profile: IProfile;
}

export type MentorComment = {
  firstName: string;
  lastName: string;
  comment: string;
};
// Type for the response from the API (list of mentors)
export type IMentorListResponse = IMentor[];

const Mentee = () => {
  const [mentors, setMentors] = useState<IMentor[]>([]);
  const [RecommendedMentors, setRecommendedMentors] = useState<IMentor[]>([]);
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [selectedMentorId, setSelectedMentorId] = useState<String | null>(null);
  const [bookingPageOpen, setBookingPageOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const mentorProfileRef = useRef(null);
  const bookingPageRef = useRef(null);
  const [mentorComments, setMentorComments] = useState<MentorComment[] |null>(null);
  const [mentorCommentsLoading, setMentorCommentsLoading] = useState(false);

  const handleCompanyChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCompanyName(e.target.value);
    },
    []
  );

  const handleRoleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRole(e.target.value);
    },
    []
  );

  const selectedMentor = useMemo(() => {
    return mentors.find((mentor) => mentor.userId === selectedMentorId) || null;
  }, [selectedMentorId, mentors]);

  const handleCardClick = async (mentor: IMentor) => {
    setSelectedMentorId(mentor.userId);
    setMentorCommentsLoading(true);
    try {
      const res = await axios.get(`/api/mentor/comments/${mentor._id}`);
      setMentorComments(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setMentorCommentsLoading(false);
    }
  };

  const handleCloseProfile = () => {
    setSelectedMentorId(null);
  };

  // Generate a dynamic heading based on search criteria
  const getHeading = () => {
    if (!hasSearched) return "Top Mentors";

    if (companyName && role) {
      return `${role} Mentors at ${companyName}`;
    } else if (companyName) {
      return `Mentors from ${companyName}`;
    } else if (role) {
      return `${role} Mentors`;
    } else if (mentors.length === 0) {
      return "No Mentors Found";
    } else {
      return "Search Results";
    }
  };

  useGSAP(() => {
    if (selectedMentorId) {
      gsap.to(mentorProfileRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(mentorProfileRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [selectedMentorId]);

  useGSAP(() => {
    if (bookingPageOpen) {
      gsap.to(bookingPageRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(bookingPageRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [bookingPageOpen]);

  const handleSearch = async () => {
    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(
        `/api/mentors?CompanyName=${companyName}&Role=${role}`
      );
      const data = await response.json();

      setMentors(data);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialMentors = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/mentors`);
        const data = await response.json();
        setMentors(data);
        setRecommendedMentors(data);
      } catch (error) {
        console.error("Error fetching initial mentors:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialMentors();
  }, []);
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl h-[160px] sm:h-[300px] lg:h-80 mt-5 md:mt-10">
        <div className="px-4 py-4 md:py-8">
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4 md:px-6">
              <h2 className="text-lg sm:text-4xl font-bold mb-3 sm:mb-4 whitespace-nowrap">
                Let's find the Right mentor
              </h2>
              <p className="text-sm sm:text-xl mb-4 sm:mb-6">
                Connect with industry experts who can guide your career journey
              </p>
              <button className="bg-white/15 text-white py-1.5 pl-2 md:px-6 sm:py-3 rounded-lg font-bold transition-all duration-300 flex items-center whitespace-nowrap hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 hover:text-white hover:shadow-2xl transform hover:scale-105">
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
        <div className="py-6">
          <div className="flex flex-wrap gap-4 sm:flex-nowrap">
            {/* Company Search Input */}
            <div className="flex-1 min-w-[calc(50%-0.5rem)] sm:min-w-0 sm:w-5/12 group">
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors duration-200 group-focus-within:text-blue-500" />
                <input
                  type="text"
                  placeholder="Search by company..."
                  value={companyName}
                  onChange={handleCompanyChange}
                  className="w-full pl-12 pr-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg transition-all duration-200 ease-in-out placeholder:text-gray-400 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:bg-white"
                />
                <div className="absolute inset-0 border border-gray-200 rounded-lg pointer-events-none transition-opacity duration-200 opacity-0 group-hover:opacity-100" />
              </div>
            </div>

            {/* Role Search Input */}
            <div className="flex-1 min-w-[calc(50%-0.5rem)] sm:min-w-0 sm:w-5/12 group">
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors duration-200 group-focus-within:text-blue-500" />
                <input
                  type="text"
                  placeholder="Search by role..."
                  value={role}
                  onChange={handleRoleChange}
                  className="w-full pl-12 pr-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg transition-all duration-200 ease-in-out placeholder:text-gray-400 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:bg-white"
                />
                <div className="absolute inset-0 border border-gray-200 rounded-lg pointer-events-none transition-opacity duration-200 opacity-0 group-hover:opacity-100" />
              </div>
            </div>

            {/* Search Button */}
            <button
              className="flex items-center justify-center gap-2 px-6 py-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full sm:w-2/12"
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              <span>{isLoading ? "Searching..." : "Search"}</span>
            </button>
          </div>

          {/* Optional Search Tags/Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            {companyName && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                Company: {companyName}
                <button
                  onClick={() => setCompanyName("")}
                  className="hover:text-blue-900"
                >
                  ×
                </button>
              </span>
            )}
            {role && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                Role: {role}
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
          <div className="py-8">
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
                    className={`text-3xl font-bold mb-6 sticky top-0 z-10 py-2 text-gray-800 ${
                      selectedMentorId
                        ? "bg-gradient-to-r from-purple-300/85 to-indigo-200/75 backdrop-blur-md border border-white/20 shadow-md rounded-lg px-4"
                        : ""
                    }`}
                  >
                    {getHeading()}
                  </h2>

                  {isLoading ? (
                    <div className="flex justify-center items-center h-48">
                      <div className="flex flex-col items-center space-y-4">
                        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                        <p className="text-gray-500 font-medium">
                          Loading mentors...
                        </p>
                      </div>
                    </div>
                  ) : mentors.length === 0 ? (
                    <div className="flex justify-center items-center h-48">
                      <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-100 max-w-md">
                        <p className="text-lg font-medium text-gray-700 mb-2">
                          No mentors found
                        </p>
                        <p className="text-gray-500">
                          Try adjusting your search criteria or explore our
                          recommended mentors below.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`transition-all duration-700 ease-in-out md:ml-10 ${
                        selectedMentorId
                          ? "flex flex-col space-y-4"
                          : "flex flex-wrap gap-8 justify-start"
                      }`}
                    >
                      {mentors.map((mentor) => (
                        <div
                          key={mentor.userId}
                          className={`transition-all duration-700 transform ${
                            selectedMentorId &&
                            selectedMentorId !== mentor.userId
                              ? "opacity-90"
                              : ""
                          }`}
                        >
                          <MentorCard
                            mentor={mentor}
                            isSelected={selectedMentorId === mentor.userId}
                            onClick={() => handleCardClick(mentor)}
                            isCollapsed={selectedMentorId !== null}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                {!selectedMentorId && !isLoading && mentors.length > 0 && (
                  <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-6">
                      Recommended for You
                    </h2>
                    <div className="flex flex-wrap gap-8 justify-start md:ml-10">
                      {mentors.map((mentor) => (
                        <div
                          key={mentor.userId}
                          className={`transition-all duration-700 transform ${
                            selectedMentorId &&
                            selectedMentorId !== mentor.userId
                              ? "opacity-90"
                              : ""
                          }`}
                        >
                          <MentorCard
                            mentor={mentor}
                            isSelected={selectedMentorId === mentor.userId}
                            onClick={() => handleCardClick(mentor)}
                            isCollapsed={selectedMentorId !== null}
                          />
                        </div>
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
                    mentorComments={mentorComments}
                    mentorCommentsLoading={mentorCommentsLoading}
                  />
                </div>
              )}
            </div>
          </div>
        </AnimateOnScroll>
      </div>
      {/* Mobile mentor profile overlay - Fixed the positioning and sizing */}
      <div
        ref={mentorProfileRef}
        className="fixed inset-0 z-20 w-full h-full bg-white overflow-y-auto pb-20 md:hidden translate-y-full"
      >
        <div className="pt-16 px-3">
          <MentorProfile
            setMentorProfile={handleCloseProfile}
            selectedMentor={selectedMentor}
            OnClick={() => setBookingPageOpen(true)}
            mentorComments={mentorComments}
            mentorCommentsLoading={mentorCommentsLoading}
          />
        </div>
      </div>
      {/* Booking page overlay - Adjusted to ensure full coverage */}
      <div
        className="fixed inset-0 z-30 w-full h-full bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 overflow-y-auto translate-y-full"
        ref={bookingPageRef}
      >
        <div className="w-full min-h-screen pt-4 px-0 md:px-4 pb-16 sm:pb-20">
          <ConfirmBooking
            selectedMentor={selectedMentor}
            setBookingPageOpen={setBookingPageOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Mentee;
