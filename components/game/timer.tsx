"use client";

import { useEffect, useState } from "react";
import getTimeSpent, { TTimeSpent } from "@/app/actions/getTimeSpent";

type TTimerProps = {
  gameStartTime: number;
};

const Timer: React.FC<TTimerProps> = ({ gameStartTime }) => {
  const [timeSinceStart, setTimeSinceStart] = useState<TTimeSpent>({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const time = new Date(Date.now() - gameStartTime);
      setTimeSinceStart(getTimeSpent(Number(time) / 1000));
    }, 1000);

    return () => clearInterval(timerInterval);
  });

  return (
    <p className="min-w-16 text-right">
      {timeSinceStart.hours === 0 &&
        timeSinceStart.minutes === 0 &&
        timeSinceStart.seconds != 0 &&
        `${timeSinceStart.seconds} sec`}
      {timeSinceStart.hours === 0 &&
        timeSinceStart.minutes != 0 &&
        `${timeSinceStart.minutes} min`}
      {timeSinceStart.hours != 0 && `${timeSinceStart.hours} hours`}
    </p>
  );
};

export default Timer;
