import { Suspense } from "react";
import Loader from "../loading";
import BookingsPage from "./pages/BookingPage";
import MentorShipActivationCard from "./pages/MentorShipActivationCard";
import { getCurrentUser } from "@/lib/serveractions";
import ClientDataLoader from "@/components/ClientDataLoader";

const MentorshipPage = async () => {
  // Get user data server-side
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen shadow-2xl mt-14 transition-all duration-500 bg-gradient-to-br from-[#eef5ff] via-[#dbeafe] to-[#bfdbfe]">
      <Suspense fallback={<Loader />}>
        {user?.MentorshipEnabled ? (
          <>
          <BookingsPage />
          <ClientDataLoader/>
          </>
        ) : (
          <MentorShipActivationCard />
        )}
      </Suspense>
    </div>
  );
};

export default MentorshipPage;
