import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { IPayment } from "@/models/Payment.model";
import { CreditCard, IndianRupee } from "lucide-react";
import React, { SetStateAction } from "react";

const MentorshipPricing = ({
isPaidMentorship,
setIsPaidMentorship,
hourlyRate,
setHourlyRate,
transactions
}:{
isPaidMentorship:boolean,
setIsPaidMentorship:React.Dispatch<SetStateAction<boolean>>,
hourlyRate:number|undefined,
setHourlyRate:React.Dispatch<SetStateAction<number|undefined>>,
transactions:IPayment[]
}) => {
      const getDate = (date: Date) => {
        return new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      };
  return (
    <div>
      <div className="space-y-4 pt-2 border-t border-border/40">
        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg backdrop-blur-sm transition-all hover:bg-muted/50">
          <div>
            <h3 className="text-sm font-medium flex items-center gap-1.5">
              <IndianRupee className="h-4 w-4 text-primary/80" />
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
                <IndianRupee className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
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
                {transactions.length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    No recent Payments
                  </p>
                ) : (
                  transactions.map((transaction, index) => (
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
    </div>
  );
};

export default MentorshipPricing;
