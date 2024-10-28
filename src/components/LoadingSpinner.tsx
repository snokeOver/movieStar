import { Circle } from "lucide-react";
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex gap-3 w-full items-center justify-center my-14">
      <Circle className="animate-spin text-yellow-400 text-4xl" />
      <span>Loading ...</span>
    </div>
  );
};

export default LoadingSpinner;
