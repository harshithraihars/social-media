import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAppSelector } from "@/lib/hooks";
import {
  IndianRupee,
  TrendingUp,
} from "lucide-react";
import React from "react";

const EarningsCard = () => {
  const userprofile = useAppSelector((state) => state.counter.userProfile);
  const amounts = userprofile?.transactions.map((t) => t.Amount) ?? [];
  const maxAmount = amounts.length > 0 ? Math.max(...amounts) : 100;
  const monthlyGoal = userprofile?.Earning;
  return (
    <div>
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
              {amounts.map((amount, i) => (
                <div
                  key={i}
                  className="w-3 bg-primary/80 rounded-t-sm min-h-[4px]"
                  style={{
                    height: `${(amount / maxAmount) * 100}%`,
                    opacity: 0.5 + i * 0.15,
                  }}
                ></div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-muted/50 rounded-lg p-2 backdrop-blur-sm">
              <p className="text-xs text-muted-foreground">This Month</p>
              <p className="text-lg font-semibold">₹{monthlyGoal || 0}</p>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Monthly Goal</span>
              <span>₹{500}</span>
            </div>
            <Progress
              value={(monthlyGoal || 0 / 1000) * 100}
              className="h-1.5"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningsCard;
