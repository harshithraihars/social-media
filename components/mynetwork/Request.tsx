import { IUser } from "@/models/user.model";
import React from "react";
import ProfilePhoto from "../shared/ProfilePhoto";
import { Check, X } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";
import { RequestHandler } from "@/lib/serveractions";

const Request = ({ req,requestsController}: { req: IUser&{sentAt:Date},requestsController:(userId: string) => void}) => {
  const timeago = formatDistanceToNowStrict(req.sentAt, {
    addSuffix: true,
  });
  const handleRequest=async (check:boolean,userId:string)=>{
    requestsController(userId)
    await RequestHandler(check,userId)
  }
  return (
    <div className="flex items-center justify-between px-3 pr-10 border-t  border-gray-400 py-4">
      <div className="flex items-center gap-4">
        <div>
          {req.profilePhoto ? <ProfilePhoto src={req.profilePhoto} /> : ""}
        </div>
        <div className="flex flex-col">
          <p className="font-[600]">
            {req.firstName} {req.lastName}
          </p>
          <p className="text-sm">{req.bio}</p>
          <p className="text-xs">{timeago}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <p className="rounded-full border border-gray-800 p-2 cursor-pointer hover:border-gray-800" onClick={()=>handleRequest(false,req.userId)}>
          <X />
        </p>
        <p className="rounded-full border border-blue-600 p-2 cursor-pointer hover:border-blue-800"onClick={()=>handleRequest(true,req.userId)}>
          <Check className="text-blue-600"/>
        </p>
      </div>
    </div>
  );
};

export default Request;
