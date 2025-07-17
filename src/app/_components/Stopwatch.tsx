"use client";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

interface StopwatchProps {
  initialTime: number; // in seconds
  isRunning: boolean;
  onTimeUp?: () => void;
  onTick?: (timeLeft: number) => void;
}

export default function Stopwatch({
  initialTime,
  isRunning,
  onTimeUp,
  onTick,
}: StopwatchProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        if (onTick) onTick(newTime);
        if (newTime === 0 && onTimeUp) onTimeUp();
        return newTime;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Badge
      className={`${
        timeLeft < 60 ? "text-red-400 font-bold" : "text-gray-400"
      } text-lg`}
    >
      {formatTime(timeLeft)}
    </Badge>
  );
}
