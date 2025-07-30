import { Suspense } from "react";
import { getCurrentUser } from "@/lib/serverAction/userAction";
import ClientDataLoader from "@/components/ClientDataLoader";
import Loader from "./loading";
import dynamic from "next/dynamic";

const BookingsPage = dynamic(() => import("./pages/BookingPage"), {
  ssr: false,
  loading: () => <Loader />,
});

const MentorShipActivationCard = dynamic(
  () => import("./pages/MentorShipActivationCard"),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

const MentorshipPage = async () => {
  // Get user data server-side
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen shadow-2xl mt-14 transition-all duration-500 bg-gradient-to-br from-[#eef5ff] via-[#dbeafe] to-[#bfdbfe]">
      {user?.MentorshipEnabled ? (
        <>
          <BookingsPage />
          <ClientDataLoader />
        </>
      ) : (
        <MentorShipActivationCard />
      )}
    </div>
  );
};

export default MentorshipPage;
