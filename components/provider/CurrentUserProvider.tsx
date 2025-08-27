"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { IProfileWithPayments, setUser, setUserProfile } from "@/lib/feature/todos/todoSlice";
import { IUser } from "@/models/user.model";

export default function CurrentUserProvider({ user,userProfile }: { user:IUser,userProfile:IProfileWithPayments|null}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {        
      dispatch(setUser(user));
    }
    if(userProfile){
      dispatch(setUserProfile(userProfile))
    }
  }, [user,userProfile]);

  return null;
}
