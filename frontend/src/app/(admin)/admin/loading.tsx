"use client";

import { Spinner } from "@material-tailwind/react";

const Loading = () => {
  return (
    <div className="flex h-screen w-screen pt-20 lg:ml-60">
      <Spinner className="h-20 w-20 text-gray-900/50" />
    </div>
  );
};

export default Loading;
