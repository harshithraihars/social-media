import React from "react";
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
const SettingsCard = () => {
  return (
    <div>
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
                <Calendar size={15} />
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

            <DateSlotSelector
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              toggleDateSlot={toggleDateSlot}
              availabilityByDate={availabilityByDate}
            />
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
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
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
                      <div key={index} className="flex justify-between text-xs">
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
      </CardContent>
    </div>
  );
};

export default SettingsCard;
