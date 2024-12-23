"use client";
import { getAllRequests } from "@/lib/serveractions";
import React, { useEffect, useState } from "react";
import Request from "./Request";
import { ArrowRight } from "lucide-react";
// If you prefer to keep things a bit cleaner:

const Requests = () => {
  const [requests, setRequest] = useState([]);
  const requestsController=(userId)=>{
    const newRequest=requests.filter((req)=>req.userId!==userId)
    setRequest(newRequest)
  }
  useEffect(() => {
    async function getRequests() {
      const requests = await getAllRequests();      
      setRequest(requests);
    }
    getRequests();
  }, []);
  return (
    <div className="w-full bg-white rounded-xl flex-1">
      {requests.length === 0 ? (
        <div className="flex flex-col justify-center px-4 min-h-32">
          <div className="flex justify-between px-5 w-full pt-4">
          <p>No Pending invitations</p>
          <p className="hover:cursor-pointer font-semibold text-xl text-gray-500">manage</p>
            </div>
            <div className="invisible" style={{ visibility: 'hidden' }}>
              dkljkdhjkdhkjdhkjd
              </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between px-5 pb-4">
            <p className="font-semibold">Invitations({requests.length})</p>
            <ArrowRight />
          </div>
          {requests.map((req,index) => (
            <Request req={req} requestsController={requestsController} key={index}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default Requests;
