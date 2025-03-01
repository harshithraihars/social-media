import React from "react";
import { SidebarItemProps } from "./Booking";
import { cn } from "@/lib/utils";

const SidebarItem = ({
  icon,
  label,
  active = false,
  badge,
}: SidebarItemProps) => {
  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
        "hover:bg-gray-100 hover:shadow-sm",
        "active:scale-[0.98] active:bg-gray-200",
        "cursor-pointer relative overflow-hidden",
        active
          ? "bg-gradient-to-r from-indigo-50 to-white text-indigo-600"
          : "text-gray-600 hover:text-gray-900"
      )}
    >
      {/* Hover indicator line */}
      <div
        className={cn(
          "absolute left-0 top-0 h-full w-0.5 rounded-full transition-all duration-200",
          active ? "bg-indigo-500" : "bg-transparent group-hover:bg-gray-300"
        )}
      />

      {/* Icon with hover animation */}
      <div
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-md transition-all duration-200",
          active
            ? "bg-indigo-100 text-indigo-600"
            : "text-gray-500 group-hover:scale-110 group-hover:text-indigo-500"
        )}
      >
        {icon}
      </div>

      {/* Label with slide-in animation on mobile */}
      <span className="transform transition-transform duration-200 sm:opacity-0 md:opacity-100 sm:block sm:translate-x-0">
        {label}
      </span>

      {/* Badge with pulse animation */}
      {badge && (
        <div className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-100 px-1.5 text-xs font-semibold text-indigo-600 transition-all duration-200 group-hover:bg-indigo-600 group-hover:text-white">
          {badge}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;