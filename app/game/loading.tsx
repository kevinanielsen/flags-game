"use client";

import { CircularProgress } from "@nextui-org/react";

const Loading = () => {
  return (
    <div className="absolute h-screen w-screen top-0 left-0 bg-slate-950/30 z-50">
      <CircularProgress size="lg" aria-label="Loading..." />
    </div>
  );
};

export default Loading;
