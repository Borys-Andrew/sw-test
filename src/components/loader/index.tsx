import React from "react";

import { Loader as LoaderIcon } from "lucide-react";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-transparent backdrop-grayscale">
      <LoaderIcon className="animate-spin w-12 h-12 text-blue-500" />
    </div>
  );
};
