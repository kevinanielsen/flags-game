"use client";

import { ICountry, ICurrentCountry } from "@/app/game/page";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import GameInput from "@/components/game-input";
import { DispatchWithoutAction, useCallback, useEffect, useState } from "react";
import ConfirmModal from "@/components/game/confirm-modal";
import Timer from "@/components/game/timer";

interface IGame {
  getRandomCountry: () => [flagCount: number, ICurrentCountry];
  handleEndGame: () => void;
  handleCorrect: (index: number) => void;
  initialFlagCount: number;
  gameStartTime: number;
}

const Game: React.FC<IGame> = ({
  getRandomCountry,
  handleCorrect,
  handleEndGame,
  initialFlagCount,
  gameStartTime,
}) => {
  const [score, setScore] = useState<number>(0);
  const [randomCountry, setRandomCountry] = useState<{
    country: ICountry;
    index: number;
  }>();
  const [isConfirmShow, setIsConfirmShow] = useState<boolean>(false);
  const [flagCount, setFlagCount] = useState<number>(initialFlagCount);

  const handleScore: DispatchWithoutAction = () => {
    setScore(score + 1);
  };

  const handleNewCountry: DispatchWithoutAction = useCallback(() => {
    const [fC, country] = getRandomCountry();
    setRandomCountry(country);
    setFlagCount(fC);
  }, [getRandomCountry]);

  useEffect(() => {
    handleNewCountry();
  }, [handleNewCountry]);

  useEffect(() => {
    if (flagCount === 0) handleEndGame();
  }, [flagCount, handleEndGame]);

  if (!randomCountry) return <p>Loading...</p>;

  return (
    <div className="border w-full rounded-md overflow-hidden">
      {isConfirmShow && (
        <ConfirmModal
          setIsConfirmShow={setIsConfirmShow}
          handleEndGame={handleEndGame}
        />
      )}
      <div className="border-b flex w-full items-center justify-between p-2">
        <p id="score-count">
          {score}/{initialFlagCount}
        </p>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsConfirmShow(true)}
        >
          End Game
        </Button>
        <Timer gameStartTime={gameStartTime} />
      </div>
      <div className="min-h-[410px] pb-8 flex flex-col justify-end items-center">
        <Image
          src={randomCountry.country.flagSvg}
          width="200"
          height="100"
          alt="Random Flag"
          className="shadow-lg border"
          priority
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
