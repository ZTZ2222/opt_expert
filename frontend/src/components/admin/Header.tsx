"use client";

import { pathDict } from "@/dict";
import { useActions } from "@/redux/hooks";
import { ArrowDownTrayIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { Button, Typography } from "@material-tailwind/react";
import { usePathname, useRouter } from "next/navigation";
import Breadcrumb from "../Breadcrumb";

interface Props {
  route: string;
}

const Header = ({ route }: Props) => {
  const { toggleSwitchMobileNavbar } = useActions();
  const { push } = useRouter();
  const path = usePathname();
  const pageName = path.split("/").pop() ?? "";
  return (
    <header className="m-4 flex flex-col gap-5 md:m-6">
      <button
        className="flex min-w-max max-w-fit items-end justify-center md:hidden"
        onClick={() => {
          toggleSwitchMobileNavbar(true);
        }}
      >
        <Bars3Icon className="h-6 w-6 fill-black" />
      </button>
      <Typography variant="h2" color="blue-gray" className="">
        {pathDict[pageName.toLowerCase()] || pageName}
      </Typography>
      <Breadcrumb />
      <div className="flex items-end gap-4">
        <Button
          variant="outlined"
          className="flex h-10 w-36 items-center justify-center gap-2 px-4 py-2 capitalize md:h-12 md:w-44"
        >
          <ArrowDownTrayIcon className="h-6 w-6" />
          <Typography className="text-sm md:text-base">Импорт</Typography>
        </Button>
        <Button
          className="flex h-10 w-36 items-center justify-center gap-1 px-4 py-2 capitalize md:h-12 md:w-44"
          onClick={() => push(`/admin/${route}/new`)}
        >
          <PlusIcon className="h-6 w-6" />
          <Typography className="shrink-0 text-sm md:text-base">
            Создать новый
          </Typography>
        </Button>
      </div>
    </header>
  );
};

export default Header;
