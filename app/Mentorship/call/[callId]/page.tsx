import { FC } from "react";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    callId?: string;
  };
}

const MentorshipCallPage: FC<PageProps> = ({ params }) => {
  const callId = params.callId;

  if (!callId) return notFound(); 

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Mentorship Call</h1>
        <p className="mt-4 text-lg">Call ID: <span className="font-mono">{callId}</span></p>
      </div>
    </div>
  );
};

export default MentorshipCallPage;
