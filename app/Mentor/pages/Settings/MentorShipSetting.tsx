"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  CalendarIcon,
  Check,
  CreditCard,
  DollarSign,
  HelpCircle,
  IndianRupee,
  Save,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAppSelector } from "@/lib/hooks";
import axios from "axios";
import EarningsCard from "./EarningsCard";
import AvailabilityScheduler from "./AvailabilityScheduler";
import MentorshipStatusCard from "./MentorshipStatusCard";
import MentorshipPricing from "./MentorshipPricing";
interface MentorshipSettingsProps {
  setMentorSettingOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MentorshipSettings({
  setMentorSettingOpen,
}: MentorshipSettingsProps) {
  const userprofile = useAppSelector((state) => state.counter.userProfile);
  const [isAcceptingMentees, setIsAcceptingMentees] = useState(true);
  const [isPaidMentorship, setIsPaidMentorship] = useState(true);
  const [availabilityByDate, setAvailabilityByDate] = useState<
    Record<string, string[]>
  >({});
  const [hourlyRate, setHourlyRate] = useState<number>();
  const [isSaving, setIsSaving] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const toggleDateSlot = (time: string) => {
    if (!selectedDate) return;

    // convert to "2025-07-20" format
    const dateKey = selectedDate.toISOString().split("T")[0];
    setAvailabilityByDate((prev) => {
      const current = prev[dateKey] || [];
      console.log(current);

      const updated = current.includes(time)
        ? current.filter((t) => t != time)
        : [...current, time];

      return {
        ...prev,
        [dateKey]: updated,
      };
    });
  };

  // Handle save settings
  const handleSave = async () => {
    try {
      setIsSaving(true);
      if (!userprofile?._id) return;
      const response = await axios.put(
        `/api/mentor/${userprofile?._id}/availability`,
        {
          availability: availabilityByDate,
          isAcceptingMentees: isAcceptingMentees,
          hourlyRate: hourlyRate,
          isPaidMentorship: isPaidMentorship,
        }
      );
      console.log(response.data);
      setMentorSettingOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  };

  // get the mentors availability from the server
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        if (userprofile?._id) {
          const res = await axios.get(
            `/api/mentor/${userprofile?._id}/availability`
          );
          setAvailabilityByDate(res.data.availability.availability);
          setHourlyRate(userprofile?.Rate);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAvailability();
  }, [userprofile?._id]);

  return (
    <div className="w-full max-w-md mx-auto">
      <EarningsCard />
      {/* Settings Card */}
      <Card className="bg-gradient-to-br from-background to-background/90 border-border shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50 pointer-events-none"></div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold">
              Mentorship Settings
            </CardTitle>
            {isAcceptingMentees ? (
              <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 transition-colors">
                Active
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="bg-muted/50 hover:bg-muted/80 transition-colors"
              >
                Inactive
              </Badge>
            )}
          </div>
          <CardDescription>
            Configure your mentorship preferences and availability
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mentorship Availability */}
          <div className="space-y-4">
            <MentorshipStatusCard
              isAcceptingMentees={isAcceptingMentees}
              setIsAcceptingMentees={setIsAcceptingMentees}
            />
            {isAcceptingMentees && (
              <AvailabilityScheduler
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                toggleDateSlot={toggleDateSlot}
                availabilityByDate={availabilityByDate}
              />
            )}
          </div>

          {/* Pricing & Payment */}
          {isAcceptingMentees && (
            <MentorshipPricing
              isPaidMentorship={isPaidMentorship}
              setIsPaidMentorship={setIsPaidMentorship}
              hourlyRate={hourlyRate}
              setHourlyRate={setHourlyRate}
              transactions={userprofile?.transactions || []}
            />
          )}
        </CardContent>

        <CardFooter className="border-t border-border/40 pt-4">
          <Button
            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <div className="flex items-center gap-2 cursor-not-allowed">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving Changes
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Settings
              </div>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
