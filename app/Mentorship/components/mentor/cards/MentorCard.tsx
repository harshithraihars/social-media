import React from "react";
import { Star, ChevronRight, Clock, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IProfile } from "@/models/profile.model";

// export type mentortype = {
//   _id: string;
//   userId: string;
//   firstName: string;
//   lastName: string;
//   profilePhoto?: string;
//   CompanyName: string;
//   Role: string;
//   Skills: string[];
//   Rate: number;
//   Rating: number;
//   bookingsCount: number;
// };

export type MentorCardProps = {
  mentor: IProfile;
  isSelected: boolean;
  onClick: () => void;
  isCollapsed: boolean;
};

// Rating Stars Component
export const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : i < rating
              ? "fill-amber-400/50 text-amber-400"
              : "fill-muted text-muted"
          } transition-all duration-300`}
        />
      ))}
    </div>
  );
};

// Mentor Card Component
export const MentorCard = React.memo(
  ({ mentor, isSelected, onClick, isCollapsed}: MentorCardProps) => (
    <Card
      className={`group relative overflow-hidden border-0 bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-50 hover:from-violet-100 hover:via-indigo-50 hover:to-blue-100 transition-all duration-500 transform ${
        isSelected ? "ring-2 ring-indigo-400" : "hover:-translate-y-2"
      } hover:shadow-xl shadow-lg shadow-indigo-100/40 cursor-pointer ${
        isCollapsed ? "w-full" : "w-full sm:w-60 md:w-72 lg:w-80 xl:w-80"
      } h-full min-h-[360px] sm:min-h-[380px] md:min-h-[420px]`}
      onClick={onClick}
    >
      {/* Decorative elements */}
      <div className="absolute -right-12 -top-12 w-24 h-24 bg-gradient-to-br from-violet-200/40 to-indigo-200/40 rounded-full group-hover:scale-150 transition-transform duration-700" />
      <div className="absolute -left-12 -bottom-12 w-24 h-24 bg-gradient-to-tr from-blue-200/40 to-indigo-200/40 rounded-full group-hover:scale-150 transition-transform duration-700" />
      <div className="absolute right-0 bottom-0 w-32 h-32 bg-gradient-to-tl from-violet-200/10 to-transparent rounded-full group-hover:scale-125 transition-transform duration-700" />

      <div className="relative p-4 md:p-5 flex flex-col h-full">
        {/* Profile section with enhanced hover effect */}
        <div className="flex items-center space-x-3 mb-3 md:mb-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-400 to-indigo-600 opacity-0 group-hover:opacity-100 blur-md transition-all duration-500 scale-110" />
            <img
              src={mentor.profilePhoto as string || "/placeholder.svg"}
              alt={mentor.firstName}
              loading="lazy"
              className="relative w-12 h-12 md:w-14 md:h-14 rounded-full object-cover ring-2 ring-indigo-100 group-hover:ring-indigo-300 transition-all duration-300 transform group-hover:scale-105 z-10"
            />
          </div>
          <div>
            <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-800 group-hover:text-indigo-700 transition-colors duration-300">
              {mentor.firstName} {mentor.lastName}
            </h3>
            <p className="text-sm md:text-sm font-medium text-gray-600">
              {mentor.Role}
            </p>
            <p className="text-sm md:text-sm text-gray-500">{mentor.CompanyName}</p>
          </div>
        </div>

        {/* Expertise tags */}
        <div className="flex flex-wrap gap-1.5 mb-2 md:mb-3">
          {mentor.Skills.slice(0, 3).map((skill, index) => (
            <Badge
              variant="secondary"
              key={index}
              className="bg-indigo-100/70 hover:bg-indigo-200 text-indigo-700 text-xs px-2 py-0.5 transition-colors duration-300"
            >
              {skill}
            </Badge>
          ))}
        </div>

        {/* Rating stars with animation */}
        <div className="flex items-center space-x-1 mb-2 md:mb-3">
          <RatingStars rating={mentor.Rating} />
          <span className="text-sm md:text-sm text-gray-600 ml-1 font-medium">
            {mentor.Rating.toFixed(1)}
          </span>
        </div>

        {/* About section - fixed height */}
        <div className="h-16 sm:h-18 md:h-20 mb-3 md:mb-4">
          <p className="text-sm md:text-sm text-gray-700 line-clamp-2 md:line-clamp-3 group-hover:text-gray-900 transition-colors duration-300">
            {mentor.About || ""}
          </p>
        </div>

        {/* Info badges */}
        <div className="space-y-2 mb-3 md:mb-4 mt-auto">
          <div className="flex items-center text-gray-700 bg-white/70 backdrop-blur-sm p-2 rounded-lg group-hover:bg-white/90 transition-all duration-300 shadow-sm">
            <DollarSign className="w-4 h-4 mr-2 text-indigo-500" />
            <span className="text-sm font-medium">
              ${mentor.Rate}/hour
            </span>
          </div>
          <div className="flex items-center text-gray-700 bg-white/70 backdrop-blur-sm p-2 rounded-lg group-hover:bg-white/90 transition-all duration-300 shadow-sm">
            <Clock className="w-4 h-4 mr-2 text-indigo-500" />
            <span className="text-sm font-medium">
              2 slots/week
            </span>
          </div>
        </div>

        {/* Action button with enhanced hover effect */}
        <Button className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-lg transform transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-indigo-500/25">
          <span className="text-sm mr-1">Schedule Session</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </div>
    </Card>
  )
);

export default MentorCard;