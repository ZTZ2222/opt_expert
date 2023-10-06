"use client";

import { Spinner } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

const CreateRequestPage = () => {
  const router = useRouter();
  router.push("http://localhost:3000/");
  return <Spinner className="ml-40 mt-20 h-16 w-16 text-gray-900/50" />;
};

export default CreateRequestPage;
