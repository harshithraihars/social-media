import type React from "react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { ConnectionRequest, setRequest } from "@/lib/feature/todos/todoSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { formatDistanceToNowStrict } from "date-fns"
import { RequestHandler } from "@/lib/serveractions"

const NotificationPopup = () => {
  const dispatch=useAppDispatch()
  const handleConnection=async (check:boolean,userId:string)=>{
    const newConnections = connectionRequests.filter(
      (connection) => connection.userId !== userId
    );
    setConnectionRequests(newConnections);
    dispatch(setRequest(newConnections));
    await RequestHandler(check,userId)
  }

  const requests = useAppSelector((state) => state.counter.ConnectionRequest);  
  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequest[]>(requests);
  useEffect(() => {
      if(connectionRequests.length==0) setConnectionRequests(requests);
  }, [requests]);
  return (
    <div className="fixed top-16 right-4 w-96 bg-white rounded-lg shadow-lg border border-gray-200 max-h-[calc(100vh-5rem)] overflow-y-auto z-30">
      <div className="p-3 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">Connection Requests ({connectionRequests.length})</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {connectionRequests.map((request) => (
          <li key={request.userId} className="p-3 hover:bg-gray-100">
            <div className="flex items-center space-x-4">
              <img
                src={request.profilePhoto}
                alt={request.firstName}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-medium text-gray-900 truncate">{request.firstName+"  "+request.lastName}</p>
                <p className="text-[12px] text-gray-600 truncate">{request.bio}</p>
                <p className="text-xs text-gray-400 font-mono">{formatDistanceToNowStrict(request.sentAt, {
                    addSuffix: true,
                  })}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => {handleConnection(true,request.userId)}}
                >
                  Accept
                </button>
                <button
                  className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  onClick={() =>{handleConnection(false,request.userId)}}
                >
                  Ignore
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NotificationPopup