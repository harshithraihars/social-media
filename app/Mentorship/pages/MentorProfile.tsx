import React, { useEffect, useState } from "react";
import { Heart, ChevronLeft, Star } from "lucide-react";
import "./profile.css";
import { IMentor, MentorComment } from "./Mentee";

type MentorProfileProps = {
  mentorComments: MentorComment[] | null;
  setMentorProfile: () => void; // Function to close the profile
  OnClick: () => void;
  selectedMentor: IMentor | null;
  mentorCommentsLoading: boolean;
};

const MentorProfile = ({
  mentorComments,
  setMentorProfile,
  OnClick,
  selectedMentor,
  mentorCommentsLoading,
}: MentorProfileProps) => {
  const [liked, setLiked] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const visibleComments = showAllComments
    ? mentorComments || []
    : (mentorComments || []).slice(0, 2);
  if (!selectedMentor) return null;
  return (
    <div className="w-full h-auto bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 rounded-xl shadow-lg overflow-hidden animate-fadeIn">
      {/* Profile Image Section with Corner Buttons - Increased height */}
      <div className="relative">
        <div
          className="w-full h-56 md:h-72 lg:h-80 bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url(${selectedMentor.profilePhoto})`,
          }}
        >
          {/* Corner navigation buttons */}
          <div className="absolute top-4 left-4">
            <button
              className="rounded-full bg-white p-2 transition hover:bg-purple-50 shadow-sm"
              onClick={setMentorProfile}
            >
              <ChevronLeft size={20} className="text-purple-800" />
            </button>
          </div>

          <div className="absolute top-4 right-4">
            <button
              className={`rounded-full p-2 transition shadow-sm ${
                liked ? "bg-pink-50" : "bg-white"
              }`}
              onClick={() => setLiked(!liked)}
            >
              <Heart
                size={20}
                className={`${
                  liked ? "text-pink-500 fill-pink-500" : "text-purple-800"
                } transition-all`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Information - Clearly separated from image */}
      <div className="px-6 py-5">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl md:text-2xl font-bold flex items-center gap-1 text-purple-900">
              {selectedMentor.firstName} {selectedMentor.lastName}
              <span className="text-blue-600">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              </span>
            </h2>
            <p className="text-gray-600 text-sm">
              {selectedMentor.profile.Role} at{" "}
              {selectedMentor.profile.CompanyName}
            </p>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${
                    i < Math.floor(selectedMentor.profile.Rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : i < selectedMentor.profile.Rating
                      ? "text-yellow-400 fill-yellow-400/50"
                      : "text-gray-300 fill-gray-300"
                  }`}
                />
              ))}
              <span className="text-gray-600 text-sm ml-1">
                {selectedMentor.profile.Rating.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="bg-purple-100 px-4 py-2 rounded-lg shadow-sm">
            <p className="text-purple-800 font-bold text-xl">
              ${selectedMentor.profile.Rate}
            </p>
            <p className="text-purple-600 text-xs font-medium text-right">
              per hour
            </p>
          </div>
        </div>
      </div>

      {/* About Section - Expanded with more details */}
      <div className="px-6 py-3">
        <h3 className="font-bold text-lg mb-2 text-purple-900">About</h3>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-700 mb-3">{selectedMentor.profile.About}</p>
          <p className="text-gray-700 mb-3">
            With extensive experience in{" "}
            {selectedMentor.profile.Skills.join(", ")},{" "}
            {selectedMentor.firstName} {selectedMentor.lastName} provides
            personalized mentorship to help you achieve your career goals and
            develop new skills.
          </p>
          <div className="flex gap-2 mt-3 flex-wrap">
            {selectedMentor.profile.Skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Comments Section with reduced comments */}
      <div className="px-6 py-3">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg text-purple-900">Comments</h3>
          <button
            className="text-purple-600 text-sm font-medium hover:text-purple-800 transition"
            onClick={() => setShowAllComments(!showAllComments)}
          >
            {showAllComments ? "Show less" : "View all"}
          </button>
        </div>

        {/* Comments list - showing only 2 comments */}
        <div className="space-y-3 max-h-56 overflow-y-auto pr-2">
          {mentorCommentsLoading ? (
            <>
              <div className="bg-white p-3 rounded-lg shadow-md animate-pulse h-16" />
              <div className="bg-white p-3 rounded-lg shadow-md animate-pulse h-16" />
            </>
          ) : visibleComments?.length > 0 ? (
            visibleComments.map((comment, index) => (
              <div
                key={index}
                className="bg-white p-3 rounded-lg shadow-md border-l-4 border-purple-400"
              >
                <p className="text-sm text-purple-700 font-medium mb-1">
                  {comment.firstName} {comment.lastName}
                </p>
                <p className="text-gray-700 text-sm">{comment.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No comments yet.</p>
          )}
        </div>
      </div>

      {/* Book Session Button with better visibility and spacing */}
      <div className="px-6 py-5 mb-3 flex items-center justify-center sticky bottom-0">
        <button
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition duration-300 flex items-center justify-center"
          onClick={OnClick}
        >
          <span className="mr-2">Book a Session</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MentorProfile;
