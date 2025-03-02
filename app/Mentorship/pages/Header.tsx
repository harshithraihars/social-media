import React, { useState } from 'react';
import { Bell, Search, Settings, User, Menu } from 'lucide-react';

type HeaderProps = {
  toggleSidebar?: () => void;
  sidebarOpen?: boolean;
  setSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ toggleSidebar, sidebarOpen,setSettingsOpen }: HeaderProps) => {
  // Use local state if no external state is provided
  const [localSidebarOpen, setLocalSidebarOpen] = useState(false);
  
  // Use either the prop or local state
  const isSidebarOpen = sidebarOpen !== undefined ? sidebarOpen : localSidebarOpen;
  
  // Use provided toggle function or fall back to local toggle
  const handleToggle = toggleSidebar || (() => setLocalSidebarOpen(!localSidebarOpen));
  
  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between px-2 sm:px-8 py-4">
        {/* Mobile Menu Toggle with Positioned Sidebar */}
        <div className="relative sm:hidden">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={handleToggle}
          >
            <Menu className="h-5 w-5" />
          </button>
          
          {/* Sidebar positioned relative to the menu button */}
          {isSidebarOpen && (
            <div className="fixed left-0 top-14 h-screen bg-white shadow-lg border-r border-gray-200 z-50 w-64">
              <div className="p-4">
                <h3 className="font-medium text-lg mb-3">Navigation</h3>
                <nav className="space-y-2">
                  <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-100">Dashboard</a>
                  <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-100">Projects</a>
                  <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-100">Tasks</a>
                  <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-100">Calendar</a>
                  <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-100">Reports</a>
                </nav>
              </div>
            </div>
          )}
        </div>
        
        {/* Search Input - Always visible */}
        <div className="flex-1 mx-2 sm:mx-4">
          <div className="relative w-full max-w-full sm:max-w-xs md:max-w-sm">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-8 pr-2 py-1 sm:py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center">
          <button className="text-gray-500 hover:text-gray-700 p-1 sm:p-2">
            <Bell className="h-5 w-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-700 p-1 sm:p-2 block md:hidden"onClick={()=>setSettingsOpen(true)}>
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;