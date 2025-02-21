import React, { useState } from "react";
import {
  Star,
  Search,
  Users,
  Briefcase,
  ChevronRight,
  Clock,
  DollarSign,
} from "lucide-react";
type mentortype = {
  id: number;
  name: string;
  role: string;
  company: string;
  about: string;
  rating: number;
  image: string;
  hourlyRate: number;
  availability: string;
};
type MentorCardProps = {
  mentor: mentortype;
};
type RatingStarsProps = {
  rating: number;
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
  },
];

const RatingStars = ({ rating }: RatingStarsProps) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={`${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ))}
    <span className="ml-2 text-sm text-gray-600">{rating}</span>
  </div>
);
const MentorCard = ({ mentor }: MentorCardProps) => (
  <div className="group md:bg-white bg-gray-100 rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden w-full sm:w-60 md:w-72 lg:w-80 xl:w-88 h-auto">
    {/* Background decoration */}
    <div className="absolute -right-12 -top-12 w-16 h-16 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500" />
    <div className="absolute -left-12 -bottom-12 w-16 h-16 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500" />

    <div className="relative flex flex-col">
      {/* Profile section with hover effect */}
      <div className="flex items-center space-x-3 mb-3">
        <div className="relative">
          <img
            src={mentor.image}
            alt={mentor.name}
            className="w-12 h-12 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full object-cover ring-2 ring-blue-100 group-hover:ring-blue-300 transition-all duration-300 transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-blue-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </div>
        <div>
          <h3 className="font-semibold text-base md:text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
            {mentor.name}
          </h3>
          <p className="text-gray-600 text-xs md:text-sm">{mentor.role}</p>
          <p className="text-gray-500 text-xs md:text-sm">{mentor.company}</p>
        </div>
      </div>

      {/* Rating stars with animation */}
      <div className="flex items-center space-x-1 mb-2">
        <RatingStars rating={mentor.rating} />
        <span className="text-xs md:text-sm text-gray-600 ml-1">
          {mentor.rating.toFixed(1)}
        </span>
      </div>

      {/* About section */}
      <p className="text-xs md:text-sm text-gray-700 line-clamp-2 md:line-clamp-3 mb-3 group-hover:text-gray-900 transition-colors duration-300">
        {mentor.about}
      </p>

      {/* Info badges */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center text-gray-600 bg-gray-50 p-2 rounded-lg group-hover:bg-blue-50 transition-colors duration-300">
          <DollarSign className="w-4 h-4 mr-2 text-blue-500" />
          <span className="text-xs md:text-sm">${mentor.hourlyRate}/hour</span>
        </div>
        <div className="flex items-center text-gray-600 bg-gray-50 p-2 rounded-lg group-hover:bg-blue-50 transition-colors duration-300">
          <Clock className="w-4 h-4 mr-2 text-blue-500" />
          <span className="text-xs md:text-sm">{mentor.availability}</span>
        </div>
      </div>

      {/* Action button with hover effect */}
      <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg transform transition-all duration-300 hover:bg-blue-700 hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 group">
        <span className="text-xs md:text-sm">Schedule Session</span>
        <ChevronRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </div>
  </div>
);
const Mentee = () => {
    const [searchCompany, setSearchCompany] = useState("");
      const [searchRole, setSearchRole] = useState("");
  return (
    <div>
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
                className="h-20 w-20 sm:h-60 sm:w-60 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-4 sm:flex-nowrap">
          {/* Company Search Input */}
          <div className="flex-1 min-w-[calc(50%-0.5rem)] sm:min-w-0 group">
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors duration-200 group-focus-within:text-blue-500" />
              <input
                type="text"
                placeholder="Search by company..."
                value={searchCompany}
                onChange={(e) => setSearchCompany(e.target.value)}
                className="w-full pl-12 pr-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg
          transition-all duration-200 ease-in-out
          placeholder:text-gray-400 text-gray-700
          focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:bg-white"
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
                value={searchRole}
                onChange={(e) => setSearchRole(e.target.value)}
                className="w-full pl-12 pr-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg
          transition-all duration-200 ease-in-out
          placeholder:text-gray-400 text-gray-700
          focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:bg-white"
              />
              <div className="absolute inset-0 border border-gray-200 rounded-lg pointer-events-none transition-opacity duration-200 opacity-0 group-hover:opacity-100" />
            </div>
          </div>

          {/* Search Button */}
          <button
            className="flex items-center justify-center gap-2 px-6 py-2 sm:py-3
      bg-gradient-to-r from-blue-500 to-blue-600
      hover:from-blue-600 hover:to-blue-700
      text-white font-medium rounded-lg
      transition-all duration-200 ease-in-out
      shadow-md hover:shadow-lg
      transform hover:-translate-y-0.5
      focus:outline-none focus:ring-2 focus:ring-blue-300
      w-full sm:w-auto"
          >
            <Search className="w-5 h-5" />
            <span>Search</span>
          </button>
        </div>

        {/* Optional Search Tags/Filters could go here */}
        <div className="mt-4 flex flex-wrap gap-2">
          {searchCompany && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
              Company: {searchCompany}
              <button
                onClick={() => setSearchCompany("")}
                className="hover:text-blue-900"
              >
                ×
              </button>
            </span>
          )}
          {searchRole && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
              Role: {searchRole}
              <button
                onClick={() => setSearchRole("")}
                className="hover:text-blue-900"
              >
                ×
              </button>
            </span>
          )}
        </div>
      </div>
      {/* Mentor Listings */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Top Mentors</h2>
          <div className="flex flex-wrap gap-6 justify-start">
            {mentors.map((mentor) => (
              <MentorCard key={mentor.name} mentor={mentor} />
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
          <div className="flex flex-wrap gap-6 justify-start">
            {mentors.slice(0, 2).map((mentor) => (
              <MentorCard key={`rec-${mentor.id}`} mentor={mentor} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Mentee;
