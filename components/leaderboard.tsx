"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TScore } from "@/types/Score";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const initialData: TScore[] = [
  {
    created_at: new Date(),
    score_count: 500,
    score_id: "Test",
    seconds_spent: 500,
    user_name: "Test",
  },
];

const LeaderBoard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["top-scores"],
    queryFn: async () => {
      const res = await axios.get<TScore[]>("/api/top-scores");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="border w-full grid justify-center items-center h-72 rounded-md text-text">
        <span>Loading...</span>
      </div>
    );

  if (error) {
    console.log(error);
    return (
      <div className="border w-full grid justify-center items-center h-72 rounded-md">
        An error loading the leaderboard occured!
      </div>
    );
  }

  if (data)
    return (
      <ScrollArea className="w-full h-72 rounded-md border">
        <div className="p-4">
          <h3 className="mb-4 text-base font-medium leading-none">
            Leaderboard
          </h3>
          {data.map((score) => (
            <>
              <div
                className="text-sm flex justify-between"
                key={score.score_id}
              >
                <p>{score.user_name}</p>
                <p>{score.score_count}</p>
              </div>
              <Separator className="my-2" />
            </>
          ))}
        </div>
      </ScrollArea>
    );
};

export default LeaderBoard;
