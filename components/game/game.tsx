import Image from "next/image";
import GameInput from "../game-input";
import { ICountry } from "@/app/game/page";
import { Button } from "@/components/ui/button";

interface IGame {
  randomCountry: ICountry;
}

const Game: React.FC<IGame> = ({ randomCountry }) => {
  return (
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
  );
};

export default Game;
