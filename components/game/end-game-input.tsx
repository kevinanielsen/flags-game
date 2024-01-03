"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Spinner } from "@nextui-org/react";
import getTimeSpent, { TTimeSpent } from "@/app/actions/getTimeSpent";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import filter from "leo-profanity";

type TEndGameInput = {
  final_score: number;
  gameEndTime: number;
  gameStartTime: number;
};

const EndGameInput: React.FC<TEndGameInput> = ({
  final_score,
  gameStartTime,
  gameEndTime,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const timeSpent: TTimeSpent = getTimeSpent(
    Number(new Date(gameEndTime - gameStartTime)) / 1000,
  );

  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.length === 0) {
      toast({ title: "Missing Name", variant: "error" });
      return;
    }

    const newName = filter.clean(name);

    if (name.length !== 0) {
      setIsLoading(true);

      axios
        .post("/api/score", {
          score_count: final_score,
          user_name: newName,
          seconds_spent: Number(new Date(gameEndTime - gameStartTime)) / 1000,
        })
        .then(() => {
          toast({ title: "Score saved!" });
          router.push("/", { scroll: false });
        })
        .catch((err) => {
          toast({ title: err.response.data, variant: "error" });
        })
        .finally(() => {
          setIsLoading(false);
          setName("");
        });
    }
  };

  const handleSkip = () => {
    router.push("/", { scroll: false });
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="border w-full rounded-md h-auto overflow-hidden flex p-4 g-4 flex-col justify-center">
      <div className="text-lg">
        Final score: {final_score | 0}
        {timeSpent.hours ? (
          <p>
            Finished in {timeSpent.hours} hours, {timeSpent.minutes} minutes,
            and {timeSpent.seconds} seconds.
          </p>
        ) : (
          <p>
            Finished in {timeSpent.minutes} minutes, and {timeSpent.seconds}{" "}
            seconds.
          </p>
        )}
      </div>
      <form
        className="flex flex-col gap-4 mt-4"
        onSubmit={(e) => handleSubmit(e)}
        name="endGameInput"
        id="endGameInput"
      >
        <Label className="text-lg w-3/4">
          Enter your name:
          <Input
            placeholder="Enter your name:"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Label>
        <div className="flex gap-x-2">
          <Button type="submit" className="max-w-fit">
            Submit score
          </Button>
          <Button type="button" variant="secondary" onClick={handleSkip}>
            Skip
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EndGameInput;
