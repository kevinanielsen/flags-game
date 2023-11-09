"use client";

import { SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ICountry } from "@/app/game/page";
import { DispatchWithoutAction, FormEvent, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface IGameInputProps {
  randomCountry: ICountry;
  handleScore: DispatchWithoutAction;
  handleCorrect: (index: number) => void;
  index: number;
  handleNewCountry: DispatchWithoutAction;
}

const GameInput: React.FC<IGameInputProps> = ({
  randomCountry,
  handleScore,
  handleCorrect,
  index,
  handleNewCountry,
}) => {
  const { country } = randomCountry;

  const [guess, setGuess] = useState<string>("");

  const { toast } = useToast();

  const handleSkip: () => void = () => {
    handleNewCountry();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (guess.toLowerCase() === country.toLowerCase()) {
      handleScore();
      setGuess("");
      handleNewCountry();
      handleCorrect(index);
    } else {
      console.log(`guess: ${guess}, country: ${country}`);
      toast({ variant: "error", title: "Wrong guess!" });
    }
  };

  return (
    <form className="w-60 mt-4" onSubmit={(e) => handleSubmit(e)}>
      <Label htmlFor="guess">Guess</Label>
      <Input
        name="guess"
        id="guess"
        placeholder="Guess"
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        spellCheck={false}
        required
        autoComplete="off"
      />
      <div className="flex gap-2 mt-2">
        <Button type="submit" className="w-full">
          Submit Guess
        </Button>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="w-12"
          onClick={handleSkip}
        >
          <SkipForward />
        </Button>
      </div>
    </form>
  );
};

export default GameInput;
