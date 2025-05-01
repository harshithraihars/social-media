import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Sparkles, Star } from "lucide-react";
import { IMentor } from "./Mentee";

export default function MentorInfo({
  selectedMentor,
}: {
  selectedMentor: IMentor|null;
}) {
  return (
    <Card className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 dark:shadow-gray-900/30 hidden md:block h-full">
      <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
      <CardContent className="pt-6 relative bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:bg-gray-900 h-full flex flex-col">
        <div className="absolute top-0 right-0 bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-md">
          TOP RATED
        </div>
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative w-28 h-28 rounded-full overflow-hidden mb-4 border-4 border-white dark:border-gray-800 shadow-lg group">
            <img
              src={selectedMentor?.profilePhoto}
              alt="Mentor profile"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent"></div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {selectedMentor?.firstName} {selectedMentor?.lastName}
          </h2>
          <p className="text-sm text-muted-foreground text-gray-800 font-semibold">
            {selectedMentor?.profile.Role} at{" "}
            {selectedMentor?.profile.CompanyName}
          </p>
          <div className="flex gap-2 mt-3">
            <span className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 text-blue-800 dark:text-blue-300 text-xs px-3 py-1 rounded-full font-medium shadow-sm transform hover:scale-105 transition-transform duration-200">
              UX Design
            </span>
            <span className="bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50 text-purple-800 dark:text-purple-300 text-xs px-3 py-1 rounded-full font-medium shadow-sm transform hover:scale-105 transition-transform duration-200">
              Product Strategy
            </span>
          </div>
          <div className="flex items-center mt-3 text-yellow-500">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            <span className="ml-1 text-xs text-gray-600 dark:text-gray-400">
              ({selectedMentor?.profile.Rating} rating)
            </span>
          </div>
        </div>
        <div className="space-y-5 flex-grow">
          <div>
            <h3 className="font-medium flex items-center text-blue-700 dark:text-blue-400">
              <Users className="h-4 w-4 mr-2" />
              About
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              {selectedMentor?.profile.About}
            </p>
          </div>
          <div>
            <h3 className="font-medium flex items-center text-blue-700 dark:text-blue-400">
              <Award className="h-4 w-4 mr-2" />
              Expertise
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2 mt-2">
              {selectedMentor?.profile.Skills?.map((expertice, index) => (
                <li key={index} className="flex items-center transform hover:translate-x-1 transition-transform duration-200">
                  <Sparkles className="h-3 w-3 text-blue-500 dark:text-blue-400 mr-2" />
                  {expertice}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-4 rounded-xl mt-4 shadow-sm border border-blue-100 dark:border-blue-900/50 transform hover:scale-102 transition-transform duration-300">
            <p className="text-sm text-center text-blue-700 dark:text-blue-400 font-medium">
              "Sarah's mentorship completely transformed my design career. Her
              insights were invaluable!"
            </p>
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
              — Michael T., Product Designer
            </p>
          </div>
        </div>
        <div className="mt-6 w-full py-4 px-4 bg-gradient-to-r from-blue-100/50 to-blue-200/50 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg text-center">
          <p className="text-blue-800 dark:text-blue-300 text-sm font-medium">Available for booking</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Responds within 24 hours</p>
        </div>
      </CardContent>
    </Card>
  );
}