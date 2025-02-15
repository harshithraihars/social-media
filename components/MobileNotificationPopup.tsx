import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/lib/hooks";
import { ConnectionRequest } from "@/lib/feature/todos/todoSlice";
import { RequestHandler } from "@/lib/serveractions";
import { formatDistanceToNowStrict } from "date-fns";
// Dummy data for connection requests
interface MobileNotificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}
const MobileNotificationPopup: React.FC<MobileNotificationPopupProps> = ({
  isOpen,
  onClose,
}) => {
  const handleConnection = async (check: boolean, userId: string) => {
    const newConnections = connectionRequests.filter(
      (connection) => connection.userId !== userId
    );
    setConnectionRequests(newConnections);
    await RequestHandler(check, userId);
  };

  const requests = useAppSelector((state) => state.counter.ConnectionRequest);
  const [connectionRequests, setConnectionRequests] =
    useState<ConnectionRequest[]>(requests);
  useEffect(() => {
    setConnectionRequests(requests);
  }, [requests]);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 500 }}
          className="fixed inset-x-0 bottom-0  rounded-t-2xl  max-h-[80vh] overflow-y-auto bg-opacity-40 backdrop-blur-sm bg-gray-300 z-50 shadow-md"
        >
          <div className="sticky top-0 bg-white p-4 border-b rounded-lg shadow-black bg-opacity-40 backdrop-blur-sm border-t-2 border-gray-400 rounded-t-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Connection Requests ({connectionRequests.length})
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <ul className="divide-y divide-gray-200">
            {connectionRequests.map((request) => (
              <motion.li
                key={request.userId}
                layoutId={`request-${request.userId}`}
                className="p-4 cursor-pointer hover:bg-gray-100"
              >
                <div className="flex justify-between px-2">
                  <div className="flex items-center space-x-4">
                    <img
                      src={request.profilePhoto || "/placeholder.svg"}
                      alt={request.firstName}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {request.firstName + " " + request.lastName}
                      </p>
                      <p className="text-sm text-gray-700 truncate">
                        {request.bio}
                      </p>
                      <p className="text-xs text-gray-600">
                        {formatDistanceToNowStrict(request.sentAt, {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 space-y-2"
                    >
                      <div className="flex space-x-3">
                        <button
                          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleConnection(true, request.userId);
                          }}
                        >
                          Accept
                        </button>
                        <button
                          className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-full hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleConnection(false, request.userId);
                          }}
                        >
                          Ignore
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNotificationPopup;
