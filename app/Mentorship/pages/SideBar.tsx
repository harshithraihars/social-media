import React, { useState } from 'react';
import { 
  Calendar, 
  Puzzle, 
  Clock, 
  Video, 
  Users, 
  Workflow,
  ChevronDown,
  X
} from 'lucide-react';
import SidebarItem from './SideBarItem';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex h-screen w-full flex-col bg-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl sm:w-16 md:w-72 sticky top-0">
  {/* Logo Section */}
  <div className="border-b p-4 sm:p-6 transition-colors duration-200 hover:bg-gray-50 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="rounded bg-gray-100 p-1.5 transition-all duration-200 hover:bg-indigo-100 hover:text-indigo-600">
        <Workflow className="h-5 w-5 text-gray-400 transition-all duration-200 hover:rotate-12 hover:text-indigo-500" />
      </div>
      <span className="hidden md:block text-xl font-medium text-gray-500 transition-all duration-200 hover:text-indigo-600">
        Scheduly
      </span>
    </div>
    <button className="sm:hidden text-gray-500 hover:text-gray-700">
      <X className="h-5 w-5" />
    </button>
  </div>

  {/* Sidebar Content: Navigation + Profile */}
  <div className="flex flex-col flex-1 justify-between">
    {/* Navigation Section */}
    <div className="flex-1 overflow-y-auto py-4">
      <nav className="space-y-1 px-3">
        <SidebarItem icon={<Calendar className="transition-transform duration-200 group-hover:rotate-12" />} label="Bookings" active badge={4} />
        <SidebarItem icon={<Puzzle className="transition-transform duration-200 group-hover:rotate-12" />} label="Event Types" />
        <SidebarItem icon={<Clock className="transition-transform duration-200 group-hover:rotate-12" />} label="Availability" />
        <SidebarItem icon={<Video className="transition-transform duration-200 group-hover:rotate-12" />} label="Calls Library" />
        <SidebarItem icon={<Users className="transition-transform duration-200 group-hover:rotate-12" />} label="Teams" />
        <SidebarItem icon={<Puzzle className="transition-transform duration-200 group-hover:rotate-12" />} label="Integrations" />
        <SidebarItem icon={<Workflow className="transition-transform duration-200 group-hover:rotate-12" />} label="Workflows" />
      </nav>
    </div>

    {/* Profile Section (Now Always Visible) */}
    <div className="border-t p-4">
      <div 
        className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-all duration-200 hover:bg-indigo-50 hover:shadow-md justify-center sm:justify-start"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex h-10 w-10 min-w-10 items-center justify-center rounded-full bg-indigo-100 font-medium text-indigo-600 transition-all duration-200 hover:scale-110 hover:bg-indigo-200 hover:shadow-md">
          JD
        </div>
        <div className="hidden md:block flex-1">
          <div className="text-sm font-medium transition-all duration-200 group-hover:text-indigo-700">John Doe</div>
          <div className="text-xs text-gray-500 transition-all duration-200 group-hover:text-indigo-500">Premium Plan</div>
        </div>
        <ChevronDown className={cn(
          "hidden h-4 w-4 text-gray-400 transition-transform duration-200 md:block",
          isHovered ? "rotate-180 text-indigo-500" : ""
        )} />
      </div>
    </div>
  </div>
</div>
  )
}