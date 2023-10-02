import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const data = Array.from({ length: 50 }).map((_, i) => `${i}. John Doe`);

const LeaderBoard = () => {
  return (
    <ScrollArea className="w-full h-72 rounded-md border">
      <div className="p-4">
        <h3 className="mb-4 text-base font-medium leading-none">Leaderboard</h3>
        {data.map((name) => (
          <>
            <div key={name} className="text-sm">
              {name}
            </div>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  );
};

export default LeaderBoard;
