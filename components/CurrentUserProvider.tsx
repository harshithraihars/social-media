// components/CurrentUserProvider.tsx
"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setUser } from "@/lib/feature/todos/todoSlice";
import { IUser } from "@/models/user.model";

export default function CurrentUserProvider({ user }: { user:IUser}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
        console.log(user);
        
      dispatch(setUser(user));
    }
  }, [user]);

  return null;
}
