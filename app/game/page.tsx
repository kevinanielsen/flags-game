"use client";

import EndGameInput from "@/components/game/end-game-input";
import Game from "@/components/game/game";
import CountriesList from "../../public/flags.json";
import { useEffect, useState } from "react";

export interface ICountry {
  country: string[];
  countryCode: string;
  flagSvg: string;
  flagPng: string;
}

export interface ICurrentCountry {
  country: ICountry;
  index: number;
}

const GamePage = () => {
  const [currentCountries, setCurrentCountries] =
    useState<ICountry[]>(CountriesList);

  const [isGameEnded, setIsGameEnded] = useState<boolean>(false);
  const [gameStartTime, setGameStartTime] = useState<number>(0);
  const [gameEndTime, setGameEndTime] = useState<number>(0);

  useEffect(() => {
    if (currentCountries.length === 0) {
      handleEndGame();
    }
  }, [currentCountries.length]);

  useEffect(() => {
    setGameStartTime(Date.now());
  }, []);

  const handleEndGame = () => {
    setIsGameEnded(true);
    setGameEndTime(Date.now());
  };

  const getRandomInt: (flagCount: number) => number = (flagCount) => {
    return Math.floor(flagCount * Math.random());
  };

  const getRandomCountry: () => [flagCount: number, ICurrentCountry] = () => {
    const flagCount = currentCountries.length;
    const randomInt = getRandomInt(flagCount);
    return [
      flagCount,
      {
        country: currentCountries[randomInt],
        index: randomInt,
      },
    ];
  };

  const handleCorrect: (index: number) => void = (index: number) => {
    setCurrentCountries(currentCountries.toSpliced(index, 1));
  };

  return (
    <main className="absolute w-full h-[90%] flex justify-center items-center">
      <div className="flex justify-center items-center gap-8 w-full max-w-2xl p-4">
        {!isGameEnded ? (
          <Game
            handleCorrect={handleCorrect}
            getRandomCountry={getRandomCountry}
            handleEndGame={handleEndGame}
            initialFlagCount={CountriesList.length}
            gameStartTime={gameStartTime}
          />
        ) : (
          <EndGameInput
            final_score={CountriesList.length - currentCountries.length}
            gameEndTime={gameEndTime}
            gameStartTime={gameStartTime}
          />
        )}
      </div>
    </main>
  );
};

export default GamePage;
