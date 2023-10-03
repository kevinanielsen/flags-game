"use client";

import { SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ICountry } from "@/app/game/page";
import { FormEvent, useState } from "react";

interface IGameInputProps {
  randomCountry: ICountry;
}

const GameInput: React.FC<IGameInputProps> = ({ randomCountry }) => {
  const { country, countryCode, flagPng, flagSvg } = randomCountry;

  const [guess, setGuess] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
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
      />
      <div className="flex gap-2 mt-2">
        <Button type="submit" className="w-full">
          Submit Guess
        </Button>
        <Button type="button" size="icon" variant="outline" className="w-12">
          <SkipForward />
        </Button>
      </div>
    </form>
  );
};

export default GameInput;
