import LeaderBoard from "@/components/leaderboard";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="absolute w-full h-[90%] flex justify-center items-center">
      <div className="flex justify-center items-center gap-8 w-full max-w-2xl">
        <div className="border w-full grid justify-center items-center h-72 rounded-md">
          <Button className="text-base" size="lg">
            Start Game
          </Button>
        </div>
        <LeaderBoard />
      </div>
    </main>
  );
}
