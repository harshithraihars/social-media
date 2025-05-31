"use client"

import { useState } from "react"
import { Check, CreditCard, DollarSign, HelpCircle, Save, TrendingUp, Users, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
// import { Toaster } from "@/components/ui/sonner"
interface MentorshipSettingsProps {
  setMentorSettingOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function MentorshipSettings({setMentorSettingOpen}:MentorshipSettingsProps) {
  const [isAcceptingMentees, setIsAcceptingMentees] = useState(true)
  const [isPaidMentorship, setIsPaidMentorship] = useState(true)
  const [hourlyRate, setHourlyRate] = useState("75")
  const [paymentMethod, setPaymentMethod] = useState("stripe")
  const [autoAcceptMentees, setAutoAcceptMentees] = useState(false)
  const [showReviews, setShowReviews] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Days of the week for availability
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  // Time slots for availability
  const timeSlots = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM", "7:00 PM"]

  // Initial availability state (example data)
  const [availability, setAvailability] = useState<Record<string, string[]>>({
    Mon: ["9:00 AM", "11:00 AM"],
    Wed: ["1:00 PM", "3:00 PM"],
    Fri: ["5:00 PM"],
  });

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
  }

  // Monthly earnings for mini chart
  const monthlyEarnings = [650, 820, 950, 1250]

  // Toggle time slot availability
  const toggleTimeSlot = (day: string, time: string) => {
    setAvailability((prev) => {
      const newAvailability = { ...prev }

      if (!newAvailability[day]) {
        newAvailability[day] = [time]
        return newAvailability
      }

      if (newAvailability[day].includes(time)) {
        newAvailability[day] = newAvailability[day].filter((t) => t !== time)
        if (newAvailability[day].length === 0) {
          delete newAvailability[day]
        }
      } else {
        newAvailability[day] = [...newAvailability[day], time]
      }

      return newAvailability
    })
  }

  // Check if a time slot is selected
  const isTimeSlotSelected = (day: string, time: string) => {
    return availability[day]?.includes(time) || false
  }

  // Handle save settings
  const handleSave = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      // toast("Settings saved", {
      //   description: "Your mentorship settings have been updated successfully.",
      // });
      setMentorSettingOpen(false);
    }, 1000)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Earnings Card */}
      <Card className="bg-gradient-to-br from-background to-background/90 border-border shadow-lg mb-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50 pointer-events-none"></div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Earnings
            </CardTitle>
            <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20 transition-colors">
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
              <h3 className="text-3xl font-bold">${earningsData.total}</h3>
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
              <p className="text-lg font-semibold">${earningsData.thisMonth}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-2 backdrop-blur-sm">
              <p className="text-xs text-muted-foreground">Pending</p>
              <p className="text-lg font-semibold">${earningsData.pendingPayouts}</p>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Monthly Goal</span>
              <span>$1,500</span>
            </div>
            <Progress value={(earningsData.thisMonth / 1500) * 100} className="h-1.5" />
          </div>
        </CardContent>
      </Card>

      {/* Settings Card */}
      <Card className="bg-gradient-to-br from-background to-background/90 border-border shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50 pointer-events-none"></div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold">Mentorship Settings</CardTitle>
            {isAcceptingMentees ? (
              <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 transition-colors">Active</Badge>
            ) : (
              <Badge variant="outline" className="bg-muted/50 hover:bg-muted/80 transition-colors">
                Inactive
              </Badge>
            )}
          </div>
          <CardDescription>Configure your mentorship preferences and availability</CardDescription>
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
                <p className="text-xs text-muted-foreground">Are you currently accepting new mentees?</p>
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
                      <p className="text-xs">Click on time slots to toggle your availability</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <Tabs defaultValue="grid" className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-8 mb-2">
                  <TabsTrigger value="grid" className="text-xs">
                    Grid View
                  </TabsTrigger>
                  <TabsTrigger value="list" className="text-xs">
                    List View
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="grid" className="mt-0">
                  <div className="grid grid-cols-8 gap-1 text-center text-xs">
                    <div className="col-span-1"></div>
                    {daysOfWeek.map((day) => (
                      <div key={day} className="col-span-1 font-medium">
                        {day}
                      </div>
                    ))}

                    {timeSlots.map((time) => (
                      <>
                        <div
                          key={`label-${time}`}
                          className="col-span-1 flex items-center justify-end pr-1 text-muted-foreground"
                        >
                          {time}
                        </div>
                        {daysOfWeek.map((day) => (
                          <div
                            key={`${day}-${time}`}
                            className={`col-span-1 aspect-square rounded-md cursor-pointer flex items-center justify-center transition-all ${
                              isTimeSlotSelected(day, time)
                                ? "bg-primary text-primary-foreground shadow-md scale-105"
                                : "bg-secondary/50 hover:bg-secondary/80"
                            }`}
                            onClick={() => toggleTimeSlot(day, time)}
                          >
                            {isTimeSlotSelected(day, time) && <Check className="h-3 w-3" />}
                          </div>
                        ))}
                      </>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="list" className="mt-0">
                  <div className="space-y-2">
                    {daysOfWeek.map((day) => (
                      <div key={`list-${day}`} className="flex items-center gap-2">
                        <div className="w-10 font-medium">{day}</div>
                        <div className="flex flex-wrap gap-1 flex-1">
                          {timeSlots.map((time) => (
                            <div
                              key={`list-${day}-${time}`}
                              className={`px-2 py-1 rounded-md text-xs cursor-pointer transition-all ${
                                isTimeSlotSelected(day, time)
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-secondary/50 hover:bg-secondary/80"
                              }`}
                              onClick={() => toggleTimeSlot(day, time)}
                            >
                              {time}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
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
                <p className="text-xs text-muted-foreground">Do you charge for mentorship sessions?</p>
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
                  <Label htmlFor="hourlyRate" className="text-xs flex items-center gap-1.5">
                    <CreditCard className="h-3.5 w-3.5 text-primary/80" />
                    Hourly Rate ($)
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="hourlyRate"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      className="pl-9 bg-background/50 focus:bg-background/80 transition-colors"
                      type="number"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="paymentMethod" className="text-xs">
                    Payment Method
                  </Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger
                      id="paymentMethod"
                      className="bg-background/50 focus:bg-background/80 transition-colors"
                    >
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stripe">
                        <div className="flex items-center gap-2">
                          <svg
                            viewBox="0 0 60 25"
                            xmlns="http://www.w3.org/2000/svg"
                            width="60"
                            height="25"
                            className="h-4 w-8"
                          >
                            <path
                              fill="currentColor"
                              d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zm-4.32 9.35v9.79H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.86zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 0 1-4.27-4.24l.02-13.17 4.02-.86v3.54h3.14V9.1h-3.14v5.85zm-4.91.7c0 2.97-2.31 4.66-5.73 4.66a11.2 11.2 0 0 1-4.46-.93v-3.93c1.38.75 3.1 1.31 4.46 1.31.92 0 1.53-.24 1.53-1C6.26 13.77 0 14.51 0 9.95 0 7.04 2.28 5.3 5.62 5.3c1.36 0 2.72.2 4.09.75v3.88a9.23 9.23 0 0 0-4.1-1.06c-.86 0-1.44.25-1.44.9 0 1.85 6.29.97 6.29 5.88z"
                              fillRule="evenodd"
                            ></path>
                          </svg>
                          Stripe
                        </div>
                      </SelectItem>
                      <SelectItem value="paypal">
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M7 11c.33-.47.6-.93.77-1.4A3.6 3.6 0 0 0 8 8V7c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v1c0 1.1-.9 2-2 2h-4a2 2 0 0 0-2 2v1c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2v-1" />
                            <path d="M17 22h-9a2 2 0 0 1-2-2v-7" />
                            <path d="M17 13v9" />
                          </svg>
                          PayPal
                        </div>
                      </SelectItem>
                      <SelectItem value="upi">
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M10.5 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v13c0 1.1-.9 2-2 2h-3.5" />
                            <path d="M2 10h20" />
                          </svg>
                          UPI
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mt-2 bg-primary/5 rounded-md p-2 border border-primary/10">
                  <h4 className="text-xs font-medium mb-1">Recent Earnings</h4>
                  <div className="space-y-1">
                    {earningsData.recentEarnings.map((earning, index) => (
                      <div key={index} className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{earning.date}</span>
                        <span>${earning.amount}</span>
                      </div>
                    ))}
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
                <p className="text-xs text-muted-foreground">Automatically accept mentee requests</p>
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
                <p className="text-xs text-muted-foreground">Display reviews on your public profile</p>
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
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
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
  )
}
