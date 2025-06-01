import React, { useState } from "react";
import { Star, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RatingPage({
  formData,
}: {
  formData: {
    Role: string;
    mentorId: string;
    menteeId: string;
  };
}) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [comment, setcomment] = useState("");
  const [hoveredOverall, setHoveredOverall] = useState(0);

  const handleStarClick = (rating: number) => {
    setRating(rating);
  };

  const handleSubmit = async () => {
    await axios.post("/api/mentor/comments", {
      mentorId: formData.mentorId,
      menteeId: formData.menteeId,
      comment: comment,
      rating:rating
    });
    router.push("/Mentorship");
  };

  const StarRating = ({
    rating,
    hovered,
    setHovered,
  }: {
    rating: number;
    hovered: number;
    setHovered: React.Dispatch<React.SetStateAction<number>>;
  }) => {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`$ w-9 h-9 transition-colors duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded`}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
          >
            <Star
              className={`w-full h-full transition-colors duration-200 ${
                star <= (hovered || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-300 hover:fill-yellow-100"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 overflow-y-scroll">
      {/* Floating elements for visual appeal */}
      <div className="fixed top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-full opacity-20 animate-bounce pointer-events-none z-0"></div>
      <div className="fixed top-40 right-10 w-32 h-32 bg-gradient-to-br from-sky-300 to-blue-300 rounded-full opacity-20 animate-pulse pointer-events-none z-0"></div>
      <div
        className="fixed bottom-20 left-20 w-16 h-16 bg-gradient-to-br from-cyan-300 to-teal-300 rounded-full opacity-30 animate-bounce pointer-events-none z-0"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-sm sm:max-w-lg mx-auto px-4 sm:px-6 py-6 sm:py-12">
          {/* Welcome Section */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-4 sm:mb-6 shadow-lg">
              <MessageCircle className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3 sm:mb-4">
              We'd Love Your Feedback!
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">
              Help us create amazing experiences together
            </p>
          </div>

          {/* Note */}
          <div className="mb-6 sm:mb-8 p-3 sm:p-6 bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-200 rounded-xl shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <MessageCircle className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
              </div>
              <div>
                <p className="text-blue-800 leading-relaxed font-medium text-sm sm:text-base">
                  <span className="font-bold">Note:</span> Your ratings help us
                  connect you with the perfect Mentor create an effective
                  learning environment.
                </p>
              </div>
            </div>
          </div>

          {/* Overall Rating Section */}
          <div className="mb-6 sm:mb-10">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-8 shadow-lg border border-white/30">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
                Share your feedback about{" "}
                <span className="text-blue-600">Mentorship</span>
              </h2>

              <div className="flex flex-col items-center mb-6">
                <StarRating
                  rating={rating}
                  hovered={hoveredOverall}
                  setHovered={setHoveredOverall}
                />

                <div className="flex justify-between w-full mt-6 px-2 sm:px-4">
                  <span className="text-xs sm:text-sm text-gray-500 font-medium bg-red-50 px-2 sm:px-3 py-1 rounded-full">
                    Poor
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 font-medium bg-green-50 px-2 sm:px-3 py-1 rounded-full">
                    Excellent
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* comment Section */}
          <div className="mb-6 sm:mb-10">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-8 shadow-lg border border-white/30">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                  Give Feedback for Mentor
                </h3>
              </div>
              <textarea
                className="w-full p-4 sm:p-6 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-300 focus:border-blue-400 resize-none transition-all duration-200 text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                placeholder="Share your thoughts about the mentoring session..."
                value={comment}
                onChange={(e) => setcomment(e.target.value)}
              />
            </div>
          </div>
          <div className="pb-6">
            <button
              disabled={comment.length == 0 || rating==0}
              onClick={() => {
                const promise = Promise.resolve(handleSubmit());
                toast.promise(promise, {
                  loading: "Submiting your Feedback...",
                  success: "Feedback submitted  successfully!",
                  error: "Failed to submit the feedback. Please try again.",
                });
              }}
              className={`${
                comment.length == 0 || rating==0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-cyan-600"
              } w-full  text-white font-semibold text-base sm:text-lg py-4 sm:py-5 px-6 rounded-lg hover:from-blue-700 hover:to-cyan-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300`}
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
