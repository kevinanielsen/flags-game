import GameInput from "@/components/game-input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
//@ts-expect-error
import CountriesList from "public/flags.json";

export interface ICountry {
  country: string;
  countryCode: string;
  flagSvg: string;
  flagPng: string;
}

const GamePage = () => {
  const getRandomCountry: () => ICountry = () => {
    const flagCount = CountriesList.length;
    return CountriesList[Math.floor(flagCount * Math.random())];
  };

  const randomCountry = getRandomCountry();

  return (
    <main className="absolute w-full h-[90%] flex justify-center items-center">
      <div className="flex justify-center items-center gap-8 w-full max-w-2xl">
        <div className="border w-full rounded-md h-auto">
          <div className="border-b flex w-full items-center justify-between p-2">
            <p id="score-count">
              {/* Dummy Text */}
              9/195
            </p>
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
              src={randomCountry.flagSvg}
              width="200"
              height="100"
              alt="Random Flag"
              className="shadow-lg border"
            />
            <GameInput randomCountry={randomCountry} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default GamePage;
