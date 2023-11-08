import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@nextui-org/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const data = Array.from({ length: 50 }).map((_, i) => `${i}. John Doe`);

const LeaderBoard = async () => {
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["top-scores"],
    queryFn: async () => await axios.get("/api/top-scores"),
  });

  if (isLoading) return <Spinner />;

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
