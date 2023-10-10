import LeaderBoard from "@/components/leaderboard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="absolute w-full h-[90%] flex justify-center items-center">
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 w-full max-w-2xl m-4 mt-12">
        <div className="border w-full grid justify-center items-center h-72 rounded-md">
          <Link
            className="text-base font-bold bg-primary dark:text-primary dark:bg-text px-4 py-3 rounded-md"
            href="/game"
          >
            Start Game
          </Link>
        </div>
        <LeaderBoard />
      </div>
    </main>
  );
}
