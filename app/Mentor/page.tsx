// import { Suspense } from "react";
// import { getCurrentUser } from "@/lib/serverAction/userAction";
// import ClientDataLoader from "@/components/ClientDataLoader";
// import Loader from "./loading";
// import dynamic from "next/dynamic";

// const BookingsPage = dynamic(() => import("./pages/BookingPage"), {
//   ssr: false,
//   loading: () => <Loader />,
// });

// const MentorShipActivationCard = dynamic(
//   () => import("./pages/MentorShipActivationCard"),
//   {
//     ssr: false,
//     loading: () => <Loader />,
//   }
// );

// const MentorshipPage = async () => {
//   // Get user data server-side
//   const user = await getCurrentUser();

//   return (
//     <div className="min-h-screen shadow-2xl mt-14 transition-all duration-500 bg-gradient-to-br from-[#eef5ff] via-[#dbeafe] to-[#bfdbfe]">
//       {user?.MentorshipEnabled ? (
//         <>
//           <BookingsPage />
//           <ClientDataLoader />
//         </>
//       ) : (
//         <MentorShipActivationCard />
//       )}
//     </div>
//   );
// };

// export default MentorshipPage;

import { getCurrentUser } from "@/lib/serverAction/userAction";
import Loader from "./loading";
import dynamic from "next/dynamic";
import MentorshipActivationCard from "./pages/MentorShipActivationCard";
import BookingsPage from "./pages/BookingPage";
import ClientDataLoader from "@/components/ClientDataLoader";
import { fetchMentorBookings } from "@/lib/serverAction/bookingAction";
import { getprofile } from "@/lib/serverAction/profileAction";

const MentorshipPage = async () => {
  // Get user data server-side
  const user = await getCurrentUser();
  if (!user?.MentorshipEnabled) {
    return <MentorshipActivationCard />;
  }

  
  let userProfile = null;

  if (user) {
    const data = await getprofile(user.userId);
    userProfile = JSON.parse(
      JSON.stringify({
        ...data?.profile,
        transactions: data?.transactions,
      })
    );
  }

  const initialBookings = await fetchMentorBookings(user.userId);

  return (
    <div className="min-h-screen shadow-2xl mt-14 transition-all duration-500 bg-gradient-to-br from-[#eef5ff] via-[#dbeafe] to-[#bfdbfe]">
      <BookingsPage
        initialBookings={initialBookings}
        userProfile={userProfile}
      />
      {/* <ClientDataLoader /> */}
    </div>
  );
};

export default MentorshipPage;
