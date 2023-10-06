import Header from "@/components/admin/Header";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header route="requests" />
      {children}
    </>
  );
};

export default Layout;
