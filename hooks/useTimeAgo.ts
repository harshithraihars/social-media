"use client"
import { useEffect, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";

export function useTimeAgo(date: Date | string) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    setTimeAgo(formatDistanceToNowStrict(dateObj, { addSuffix: true }));
  }, [date]);

  return timeAgo;
}
