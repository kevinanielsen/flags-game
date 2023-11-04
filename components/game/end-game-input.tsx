"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { Spinner } from "@nextui-org/react";

type TEndGameInput = {
  final_score: number;
  seconds_spent: number;
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState();
  const [data, setData] = useState();

  const [name, setName] = useState<string>("");

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

  const { hours, minutes, seconds } = getTimeSpent(seconds_spent);

  const handleSubmit = () => {
    setIsLoading(true);

    axios
      .post("/api/score", {
        score_count: final_score,
        user_name: name,
        seconds_spent: seconds_spent,
      })
      .then((res) => console.log(res))
      .catch((err: any) => setError(err))
      .finally(() => setIsLoading(false));
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="border w-full rounded-md h-auto overflow-hidden flex p-4 g-4 flex-col justify-center">
      <p className="text-lg">
        Final score: {final_score | 0}
        {hours ? (
          <p>
            Finished in {hours} hours, {minutes} minutes, and {seconds} seconds.
          </p>
        ) : (
          <p>
            Finished in {minutes} minutes, and {seconds} seconds.
          </p>
        )}
      </p>
      <form className="flex flex-col gap-4 mt-4">
        <Label className="text-lg w-3/4">
          Enter your name:
          <Input
            placeholder="Enter your name:"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Label>
        <Button type="submit" className="max-w-fit" onClick={handleSubmit}>
          Submit score
        </Button>
      </form>
    </div>
  );
};

export default EndGameInput;
