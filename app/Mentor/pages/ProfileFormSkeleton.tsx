import {
    Card,
    CardContent,
  } from "@/components/ui/card";
  
  export default function ProfileFormSkeleton() {
    return (
      <div className="w-full max-w-2xl py-4 px-4 sm:px-4">
        <Card className="shadow-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 border-none overflow-hidden">
          <CardContent className="p-6">
            {/* Company Name Skeleton */}
            <div className="mb-6">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            
            {/* Role Skeleton */}
            <div className="mb-6">
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            
            {/* Skills Skeleton */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="flex gap-2 mb-2">
                <div className="h-10 flex-1 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-10 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 w-24 bg-gradient-to-r from-indigo-400 to-purple-400 dark:from-indigo-600 dark:to-purple-600 opacity-40 rounded-full animate-pulse"></div>
                ))}
              </div>
            </div>
            
            {/* About Skeleton */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            
            {/* Rate Skeleton */}
            <div className="mb-6">
              <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            
            {/* Button Skeleton */}
            <div className="mt-8">
              <div className="h-10 w-full bg-gradient-to-r from-indigo-400 to-purple-400 dark:from-indigo-600 dark:to-purple-600 opacity-50 rounded animate-pulse"></div>
            </div>
            
            {/* Loading Indicator */}
            <div className="absolute inset-0 flex items-center justify-center bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-4 border-indigo-200 dark:border-indigo-900 animate-spin"></div>
                  <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-t-4 border-indigo-600 dark:border-indigo-400 animate-spin"></div>
                </div>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium">Loading your profile...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }