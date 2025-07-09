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
      const {data}=await axios.get(`/api/mentors/earning?userId=${user?.id}`)
      console.log(data.data);
      dispatch(setUserProfile(data.data))   
    };
    fetchData(); 
  }, [user?.id, dispatch]);

  return null;
};

export default ClientDataLoader;
