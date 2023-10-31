"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";

type TEndGameInput = {
  final_score: number;
  seconds_spent?: number;
};

type TTimeSpent = {
  hours: number;
  minutes: number;
  seconds: number;
};

type TTimeTaken = string | null | undefined;

const EndGameInput: React.FC<TEndGameInput> = ({
  final_score,
  seconds_spent,
}) => {
  const [timeSpent, setTimeSpent] = useState<TTimeSpent>();

  const [hours, setHours] = useState<null | string>(null);
  const [minutes, setMinutes] = useState<null | string>(null);
  const [seconds, setSeconds] = useState<null | string>(null);

  useEffect(() => {
    if (seconds_spent) {
      setTimeSpent(getTimeSpent(seconds_spent));
    }

    if (timeSpent) {
      if (timeSpent.hours === 0) {
        setHours(null);
      } else {
        setHours(`${timeSpent.hours} hours, `);
      }
      if (timeSpent.minutes === 0) {
        setMinutes(null);
      } else {
        setMinutes(`${timeSpent.minutes} minutes, and `);
      }
      if (timeSpent.seconds === 0) {
        setSeconds(null);
      } else {
        setSeconds(`${timeSpent.seconds} seconds.`);
      }
    }
  }, [seconds_spent, timeSpent]);

  const getTimeSpent: (input_seconds: number) => TTimeSpent = (
    input_seconds: number,
  ) => {
    let hours: number = 0;
    let minutes: number = 0;
    let seconds: number = input_seconds;

    if (seconds > 60) {
      minutes = Math.round(seconds / 60);
      seconds = seconds % 60;
      if (minutes > 60) {
        hours = Math.round(minutes / 60);
        minutes = minutes % 60;
      }
    }

    return { hours, minutes, seconds };
  };

  return (
    <div className="border w-full rounded-md h-auto overflow-hidden flex p-4 flex-col justify-center">
      <p className="text-lg">
        Final score: {final_score | 0}
        {timeSpent && (
          <p>
            Finished in {hours} {minutes} {seconds}
          </p>
        )}
      </p>
      <Label className="text-lg w-3/4">
        Enter your name:
        <Input />
      </Label>
    </div>
  );
};

export default EndGameInput;
