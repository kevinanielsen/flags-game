"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { Spinner } from "@nextui-org/react";
import getTimeSpent from "@/app/actions/getTimeSpent";

type TEndGameInput = {
  final_score: number;
  seconds_spent: number;
};

const EndGameInput: React.FC<TEndGameInput> = ({
  final_score,
  seconds_spent,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState();
  const [data, setData] = useState<any>();

  const [name, setName] = useState<string>("");

  const { hours, minutes, seconds } = getTimeSpent(seconds_spent);

  const handleSubmit = () => {
    setIsLoading(true);

    axios
      .post("/api/score", {
        score_count: final_score,
        user_name: name,
        seconds_spent: seconds_spent,
      })
      .then((res) => setData(res))
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
