"use client";

import { ICountry, ICurrentCountry } from "@/app/game/page";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import GameInput from "../game-input";
import { DispatchWithoutAction, useCallback, useEffect, useState } from "react";

interface IGame {
  getRandomCountry: () => ICurrentCountry;
  handleCorrect: (index: number) => void;
}

const Game: React.FC<IGame> = ({ getRandomCountry, handleCorrect }) => {
  const [score, setScore] = useState<number>(0);
  const [randomCountry, setRandomCountry] = useState<{
    country: ICountry;
    index: number;
  }>();

  const handleScore: DispatchWithoutAction = () => {
    setScore(score + 1);
  };

  const handleNewCountry: DispatchWithoutAction = useCallback(() => {
    setRandomCountry(getRandomCountry());
  }, [getRandomCountry, setRandomCountry]);

  useEffect(() => {
    handleNewCountry();
  }, [handleNewCountry]);

  if (!randomCountry) return <p>Loading...</p>;

  return (
    <div className="border w-full rounded-md h-auto overflow-hidden">
      <div className="border-b flex w-full items-center justify-between p-2">
        <p id="score-count">{score}/193</p>
        <Button size="sm" variant="outline">
          Cancel
        </Button>
        <p id="timer">
          {/* Dummy Text */}
          1.25
        </p>
      </div>
      <div className="h-96 pb-8 flex flex-col justify-end items-center">
        <Image
          src={randomCountry.country.flagSvg}
          width="200"
          height="100"
          alt="Random Flag"
          className="shadow-lg border"
        />
        <GameInput
          randomCountry={randomCountry.country}
          handleScore={handleScore}
          index={randomCountry.index}
          handleCorrect={handleCorrect}
          handleNewCountry={handleNewCountry}
        />
      </div>
    </div>
  );
};

export default Game;
