import React from "react";
import { Loader2 } from "lucide-react";
// import { useAppSelector } from "@/lib/hooks";
import { Loader as LoadIcon } from "lucide-react";

const Loader = () => {
//   const isLoading = useAppSelector((state) => state.counter.isLoading);


  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="rounded-lg bg-white p-6 shadow-lg flex flex-col items-center gap-3 w-full sm:w-auto max-w-xs sm:max-w-md">
        {/* <Loader2 className="h-12 w-12 sm:h-16 sm:w-16 animate-spin text-primary" /> */}
        <LoadIcon className="h-6 w-6 sm:h-10 sm:w-10 animate-[spin_2s_linear_infinite] text-primary" />
        <span className="text-sm font-medium text-gray-600">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;