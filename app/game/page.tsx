import Game from "@/components/game/game";
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
        <Game randomCountry={randomCountry} />
      </div>
    </main>
  );
};

export default GamePage;
