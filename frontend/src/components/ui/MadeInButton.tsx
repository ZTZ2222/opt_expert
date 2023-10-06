"use client";

import { useActions, useAppSelector } from "@/redux/hooks";

const MadeInButton = () => {
  const toggleCountriesMenu = useAppSelector(
    (state) => state.toggle.toggleCountriesMenu,
  );

  const { toggleSwitchCountriesMenu, toggleSwitchDarkOverlay } = useActions();

  return (
    <div className="relative hidden text-madeInColor md:block">
      <button
        onClick={() => {
          toggleSwitchCountriesMenu(true);
          toggleSwitchDarkOverlay(true);
        }}
        className="relative flex h-9 w-[194px] items-center justify-center gap-[10px] rounded-[25px] border border-madeInColor"
      >
        <div className="text-center text-[14px] font-medium">
          Страна производства {toggleCountriesMenu ? "▲" : "▼"}
        </div>
      </button>
      <ul
        className={`${
          toggleCountriesMenu ? "h-40" : "h-0"
        } absolute left-5 top-10 z-50 w-4/5 flex-col divide-y-2 divide-gray-200 overflow-hidden rounded-md bg-gray-100 font-medium transition-all duration-300`}
      >
        <li className="p-[14px]">Китай</li>
        <li className="p-[14px]">Турция</li>
        <li className="p-[14px]">Кыргызстан</li>
      </ul>
    </div>
  );
};

export default MadeInButton;
