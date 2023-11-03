import { Button } from "@/components/ui/button";
import React, { Dispatch, SetStateAction } from "react";

type TConfirmModal = {
  setIsConfirmShow: Dispatch<SetStateAction<boolean>>;
  handleEndGame: () => void;
};

const ConfirmModal: React.FC<TConfirmModal> = ({
  setIsConfirmShow,
  handleEndGame,
}) => {
  return (
    <div className="absolute w-screen h-screen top-0 left-0 bg-black/20 flex justify-center items-center">
      <div className="bg-white/95 rounded shadow-lg border justify-center items-center flex flex-col m-4 p-8 w-full max-w-lg backdrop-filter">
        <div className="flex flex-col gap-4">
          <p className="text-lg font-bold">
            Are you sure you want to end game?
          </p>
          <div className="flex gap-4">
            <Button variant="destructive" onClick={handleEndGame}>
              End Game
            </Button>
            <Button variant="outline" onClick={() => setIsConfirmShow(false)}>
              Continue Playing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
