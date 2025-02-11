"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";
import { Loader as LoadIcon } from "lucide-react";

const Loader = () => {
  const isLoading = useAppSelector((state) => state.counter.isLoading);

  if (!isLoading) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navigation Bar Skeleton */}
      <div className="h-14 bg-white border-b border-gray-300 flex items-center px-4">
        <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"/>
        <div className="hidden md:flex w-64 ml-4 space-x-8">
          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"/>
          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"/>
          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"/>
          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"/>
        </div>
        {/* Mobile Nav Icons */}
        <div className="flex md:hidden ml-auto space-x-4">
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"/>
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"/>
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"/>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Left Sidebar - Hidden on Mobile */}
          <div className="hidden md:block md:col-span-3">
            <div className="bg-white rounded-lg shadow">
              <div className="h-20 bg-gray-200 rounded-t-lg animate-pulse"/>
              <div className="p-4 space-y-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full -mt-12 mx-auto border-4 border-white animate-pulse"/>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"/>
                <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"/>
              </div>
            </div>
          </div>

          {/* Main Feed - Full Width on Mobile */}
          <div className="col-span-1 md:col-span-6 space-y-4">
            {/* Post Creation Box */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"/>
                <div className="flex-1 h-10 bg-gray-200 rounded-full animate-pulse"/>
              </div>
            </div>

            {/* Posts */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow p-4 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"/>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"/>
                    <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse"/>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-200 rounded animate-pulse"/>
                  <div className="h-3 bg-gray-200 rounded animate-pulse"/>
                  <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"/>
                </div>
                {/* Mobile Interaction Bar */}
                <div className="flex justify-between mt-4 pt-3 border-t">
                  {[1, 2, 3, 4].map((action) => (
                    <div key={action} className="w-8 h-8 bg-gray-200 rounded animate-pulse"/>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar - Hidden on Mobile */}
          <div className="hidden md:block md:col-span-3">
            <div className="bg-white rounded-lg shadow p-4 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"/>
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"/>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-200 rounded animate-pulse"/>
                    <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
