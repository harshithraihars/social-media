"use client";

import { useState } from "react";
import {
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useAppSelector } from "@/lib/hooks";
import axios from "axios";
import { Calendar } from "@/components/ui/calendar";
import TimeSlots, { timeSlots } from "./TimeSlot";
import DateSlotSelector from "./DateSlotSelector";
// import { Toaster } from "@/components/ui/sonner"
interface MentorshipSettingsProps {
  setMentorSettingOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MentorshipSettings({
  setMentorSettingOpen,
}: MentorshipSettingsProps) {
  const userprofile = useAppSelector((state) => state.counter.userProfile);
  const [isAcceptingMentees, setIsAcceptingMentees] = useState(true);
  const [isPaidMentorship, setIsPaidMentorship] = useState(true);
  const [availabilityByDate, setAvailabilityByDate] = useState<Record<string, string[]>>({});
  const [hourlyRate, setHourlyRate] = useState("75");
  // const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [autoAcceptMentees, setAutoAcceptMentees] = useState(false);
  const [showReviews, setShowReviews] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date()
  );



  // Earnings data
  const earningsData = {
    total: 4875,
    thisMonth: 1250,
    lastMonth: 950,
    pendingPayouts: 375,
    sessionsCompleted: 65,
    recentEarnings: [
      { date: "Oct 15", amount: 150 },
      { date: "Oct 12", amount: 75 },
      { date: "Oct 8", amount: 225 },
      { date: "Oct 5", amount: 150 },
    ],
  };

  // Monthly earnings for mini chart
  const monthlyEarnings = [650, 820, 950, 1250];

  // Toggle time slot availability
  const toggleDateSlot = (time: string) => {
    if(!selectedDate) return;

    // convert to "2025-07-20" format
    const dateKey = selectedDate.toISOString().split("T")[0];
    setAvailabilityByDate((prev)=>{
      const current=prev[dateKey]||[]
      console.log(current);
      
      const updated=current.includes(time)?
      current.filter((t)=>t!=time):
      [...current,time]

      return {
        ...prev,
        [dateKey]:updated
      }
    })
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
        }
      );
      console.log(response.data);
      setMentorSettingOpen(false)
    } catch (error) {
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  };

  const getDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Earnings Card */}
      <Card className="bg-gradient-to-br from-background to-background/90 border-border shadow-lg mb-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50 pointer-events-none"></div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-primary" />
              Earnings
            </CardTitle>
            <Badge
              variant="outline"
              className="bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +31.5%
            </Badge>
          </div>
          <CardDescription>Your mentorship revenue dashboard</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-end justify-between mb-2">
            <div>
              <p className="text-sm text-muted-foreground">Total Earned</p>
              <h3 className="text-3xl font-bold">
                ₹{userprofile?.Earning || 0.0}
              </h3>
            </div>
            <div className="flex h-12 items-end gap-1">
              {monthlyEarnings.map((value, i) => (
                <div
                  key={i}
                  className="w-3 bg-primary/80 rounded-t-sm"
                  style={{
                    height: `${(value / Math.max(...monthlyEarnings)) * 100}%`,
                    opacity: 0.5 + i * 0.15,
                  }}
                ></div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-muted/50 rounded-lg p-2 backdrop-blur-sm">
              <p className="text-xs text-muted-foreground">This Month</p>
              <p className="text-lg font-semibold">
                ₹{userprofile?.Earning || 0}
              </p>
            </div>
            {/* <div className="bg-muted/50 rounded-lg p-2 backdrop-blur-sm">
              <p className="text-xs text-muted-foreground">Pending</p>
              <p className="text-lg font-semibold">${earningsData.pendingPayouts}</p>
            </div> */}
          </div>

          <div className="mt-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Monthly Goal</span>
              <span>$1,500</span>
            </div>
            <Progress
              value={(earningsData.thisMonth / 1500) * 100}
              className="h-1.5"
            />
          </div>
        </CardContent>
      </Card>

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
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg backdrop-blur-sm transition-all hover:bg-muted/50">
              <div>
                <h3 className="text-sm font-medium flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-primary/80" />
                  Mentorship Status
                </h3>
                <p className="text-xs text-muted-foreground">
                  Are you currently accepting new mentees?
                </p>
              </div>
              <Switch
                checked={isAcceptingMentees}
                onCheckedChange={setIsAcceptingMentees}
                className="data-[state=checked]:bg-green-500"
              />
            </div>

            <div className="space-y-3 bg-muted/20 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary/80"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                    <path d="M8 14h.01" />
                    <path d="M12 14h.01" />
                    <path d="M16 14h.01" />
                    <path d="M8 18h.01" />
                    <path d="M12 18h.01" />
                    <path d="M16 18h.01" />
                  </svg>
                  Availability Schedule
                </h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <HelpCircle className="h-3.5 w-3.5" />
                        <span className="sr-only">Schedule Info</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p className="text-xs">
                        Click on time slots to toggle your availability
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <DateSlotSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} toggleDateSlot={toggleDateSlot} availabilityByDate={availabilityByDate}/>
            </div>
          </div>

          {/* Pricing & Payment */}
          <div className="space-y-4 pt-2 border-t border-border/40">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg backdrop-blur-sm transition-all hover:bg-muted/50">
              <div>
                <h3 className="text-sm font-medium flex items-center gap-1.5">
                  <DollarSign className="h-4 w-4 text-primary/80" />
                  Paid Mentorship
                </h3>
                <p className="text-xs text-muted-foreground">
                  Do you charge for mentorship sessions?
                </p>
              </div>
              <Switch
                checked={isPaidMentorship}
                onCheckedChange={setIsPaidMentorship}
                className="data-[state=checked]:bg-green-500"
              />
            </div>

            {isPaidMentorship && (
              <div className="space-y-3 bg-muted/20 p-3 rounded-lg">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="hourlyRate"
                    className="text-xs flex items-center gap-1.5"
                  >
                    <CreditCard className="h-3.5 w-3.5 text-primary/80" />
                    Hourly Rate ($)
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="hourlyRate"
                      value={userprofile?.Rate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      className="pl-9 bg-background/50 focus:bg-background/80 transition-colors"
                      type="number"
                    />
                  </div>
                </div>
                <div className="mt-2 bg-primary/5 rounded-md p-2 border border-primary/10">
                  <h4 className="text-xs font-medium mb-1">Recent Earnings</h4>
                  <div className="space-y-1">
                    {userprofile?.transactions.length === 0 ? (
                      <p className="text-muted-foreground text-sm">
                        No recent Payments
                      </p>
                    ) : (
                      userprofile?.transactions.map((transaction, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-xs"
                        >
                          <span className="text-muted-foreground">
                            {getDate(transaction.CreatedAt)}
                          </span>
                          <span>₹{transaction.Amount}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mentee Management */}
          <div className="space-y-4 pt-2 border-t border-border/40">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg backdrop-blur-sm transition-all hover:bg-muted/50">
              <div>
                <h3 className="text-sm font-medium flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary/80"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  Auto-Accept Mentees
                </h3>
                <p className="text-xs text-muted-foreground">
                  Automatically accept mentee requests
                </p>
              </div>
              <Switch
                checked={autoAcceptMentees}
                onCheckedChange={setAutoAcceptMentees}
                className="data-[state=checked]:bg-green-500"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg backdrop-blur-sm transition-all hover:bg-muted/50">
              <div>
                <h3 className="text-sm font-medium flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary/80"
                  >
                    <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                    <path d="M10 2c1 .5 2 2 2 5" />
                  </svg>
                  Show Reviews
                </h3>
                <p className="text-xs text-muted-foreground">
                  Display reviews on your public profile
                </p>
              </div>
              <Switch
                checked={showReviews}
                onCheckedChange={setShowReviews}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-border/40 pt-4">
          <Button
            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <div className="flex items-center gap-2">
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
