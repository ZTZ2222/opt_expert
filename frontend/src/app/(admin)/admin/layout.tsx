"use client";

import SideNav from "@/components/admin/SideNav";
import { useAppSelector } from "@/redux/hooks";
import { Spinner } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  const [showSpinner, setShowSpinner] = useState<boolean>(true);
  const router = useRouter();

  const isAuthenticated = useAppSelector(
    (state) => state.auth.access_token !== null,
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth");
    }
    setShowSpinner(false);
  }, [isAuthenticated, router, setShowSpinner]);

  if (showSpinner) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner className="h-16 w-16 text-gray-900/50" />
      </div>
    );
  }
  if (isAuthenticated) {
    return (
      <main className="flex">
        <SideNav />
        <section className="w-full">{children}</section>
      </main>
    );
  }
};

export default StoreLayout;
