import { Switch } from "@/components/ui/switch";
import { Users } from "lucide-react";
import React, { SetStateAction } from "react";

const MentorshipStatusCard = (
  { isAcceptingMentees,setIsAcceptingMentees }:
  { isAcceptingMentees: boolean,setIsAcceptingMentees:React.Dispatch<SetStateAction<boolean>> }
) => {
  return (
    <div>
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
          onCheckedChange={()=>setIsAcceptingMentees(!isAcceptingMentees)}
          className="data-[state=checked]:bg-green-500"
        />
      </div>
    </div>
  );
};

export default MentorshipStatusCard;
