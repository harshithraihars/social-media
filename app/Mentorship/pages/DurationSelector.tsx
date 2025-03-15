import { Clock, CheckCircle } from "lucide-react";

interface DurationSelectorProps {
  duration: string;
  setDuration: (duration: string) => void;
}

export default function DurationSelector({ duration, setDuration }: DurationSelectorProps) {
  return (
    <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-lg p-4 shadow-sm">
      <div className="grid grid-cols-2 gap-4">
        <div
          className={`border rounded-lg p-5 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
            duration === "30"
              ? "border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 shadow-sm"
              : "hover:border-blue-300 dark:hover:border-blue-700"
          }`}
          onClick={() => setDuration("30")}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">
              <Clock className="h-5 w-5" />
            </div>
            <span className="font-medium text-blue-700 dark:text-blue-400">
              30 minutes
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <p className="text-lg font-bold">$50</p>
            <p className="text-xs text-muted-foreground">
              /session
            </p>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Quick advice & specific questions
          </p>
          {duration === "30" && (
            <div className="absolute top-2 right-2">
              <CheckCircle className="h-5 w-5 text-blue-500" />
            </div>
          )}
        </div>
        <div
          className={`border rounded-lg p-5 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
            duration === "60"
              ? "border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 shadow-sm"
              : "hover:border-blue-300 dark:hover:border-blue-700"
          }`}
          onClick={() => setDuration("60")}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">
              <Clock className="h-5 w-5" />
            </div>
            <span className="font-medium text-blue-700 dark:text-blue-400">
              60 minutes
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <p className="text-lg font-bold">$90</p>
            <p className="text-xs text-muted-foreground">
              /session
            </p>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            In-depth discussion & portfolio review
          </p>
          {duration === "60" && (
            <div className="absolute top-2 right-2">
              <CheckCircle className="h-5 w-5 text-blue-500" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}