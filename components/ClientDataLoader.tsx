"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { setUserProfile } from "@/lib/feature/todos/todoSlice";

const ClientDataLoader = () => {
  const dispatch = useDispatch();
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          console.log("getting called");

          const { data } = await axios.get(
            `/api/mentor/profile?userId=${user?.id}`
          );
          const profile = data.data.profile;
          profile.transactions = data.data.transactions;
          dispatch(setUserProfile(profile));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user?.id, dispatch]);

  return null;
};

export default ClientDataLoader;
