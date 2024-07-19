"use client";
import React, { useState, useEffect } from "react";
import { MaterialSymbolsTimerOutline } from "./Icons";

export default function Timer() {
  const [timeRemaining, setTimeRemaining] = useState(3 * 60 * 60); // 3 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="flex justify-around items-center gap-2">
      <MaterialSymbolsTimerOutline />
      <div>
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>
    </div>
  );
}
