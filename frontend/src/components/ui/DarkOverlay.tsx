"use client";

import { useActions, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

const DarkOverlay = () => {
  const toggleDarkOverlay = useAppSelector(
    (state) => state.toggle.toggleDarkOverlay,
  );

  const {
    toggleSwitchCart,
    toggleSwitchCountriesMenu,
    toggleSwitchDarkOverlay,
  } = useActions();

  useEffect(() => {
    if (toggleDarkOverlay) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [toggleDarkOverlay]);

  return toggleDarkOverlay ? (
    <div
      onClick={() => {
        toggleSwitchCart(false);
        toggleSwitchCountriesMenu(false);
        toggleSwitchDarkOverlay(false);
      }}
      className="fixed left-0 top-0 z-30 h-full w-screen bg-black opacity-50"
    ></div>
  ) : null;
};

export default DarkOverlay;
