import Footer from "@/components/Footer";
import Header from "@/components/Header";
import DarkOverlay from "@/components/ui/DarkOverlay";
import React from "react";

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DarkOverlay />
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default StoreLayout;
