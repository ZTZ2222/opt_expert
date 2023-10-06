"use client";

import { useActions, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Breadcrumb from "./Breadcrumb";
import Search from "./Search";
import { MenuClose, MenuIcon } from "./svg";
import Cart from "./ui/Cart";
import MadeInButton from "./ui/MadeInButton";

const menuList = [
  { id: 1, name: "Главная", href: "/" },
  { id: 2, name: "О нас", href: "/o-nas" },
  { id: 3, name: "Каталог", href: "/katalogi" },
  { id: 4, name: "Условия", href: "/usloviya" },
  { id: 5, name: "Для селлеров", href: "/dlya-sellerov" },
  { id: 6, name: "Доставка", href: "/dostavka" },
  { id: 7, name: "Фабрика", href: "/fabrika" },
  { id: 8, name: "Контакты", href: "/kontakti" },
];

const Header = () => {
  const toggleMobileNavbar = useAppSelector(
    (state) => state.toggle.toggleMobileNavbar,
  );

  const { toggleSwitchMobileNavbar, toggleSwitchDarkOverlay } = useActions();

  const pathname = usePathname();

  return (
    <header className={`${pathname !== "/" && "mb-6 md:mb-12"} flex flex-col`}>
      {/* Desktop/Tablet Navbar */}
      <div className="hidden w-full items-center justify-center divide-x-[1px] bg-gradient-to-b from-bgGradient1 to-bgGradient2 font-bold uppercase text-white md:flex md:py-6 md:text-xs lg:py-9 lg:text-[18px] xl:py-10 xl:text-[26px] xl:tracking-wide">
        {menuList.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="px-4 transition-all delay-75 duration-100 hover:scale-95"
          >
            {item.name}
          </Link>
        ))}
      </div>
      {pathname !== "/" && (
        <div className="mb-12 hidden h-[65px] w-full items-end justify-center gap-4 bg-transparent px-2 md:flex xl:px-5">
          <Search
            className="h-9 w-3/5 border border-searchBorder text-searchText xl:w-[816px]"
            inputClassName="text-[14px] font-medium placeholder:text-[14px] placeholder:font-medium placeholder:text-searchText"
          />
          <MadeInButton />
          <Cart />
        </div>
      )}
      {pathname !== "/" && (
        <Breadcrumb className="mt-8 justify-center md:mx-6 md:mt-0 lg:mx-8 xl:mx-32" />
      )}

      {/* Mobile Navbar */}
      <div className="order-first flex h-28 w-full justify-between bg-gradient-to-b from-bgGradient1 to-bgGradient2 md:hidden">
        <button
          className="flex w-1/5 items-end justify-center py-4"
          onClick={() => {
            toggleSwitchMobileNavbar(true);
            toggleSwitchDarkOverlay(true);
          }}
        >
          <MenuIcon className="m-2 h-[18px] w-[26px]" />
        </button>
        <div className="flex flex-col self-center">
          <div className="relative mb-5 h-[23px] w-[103px] self-center">
            <Image
              alt="Opt expert"
              src="/LogoMiniWhite.png"
              fill
              className="object-contain"
            />
          </div>
          <Search
            className="mr-5 h-9 w-full gap-3 bg-gray-300 text-black"
            inputClassName="text-sm placeholder:text-sm placeholder:text-gray-500"
          />
        </div>
        <div className="flex w-1/5 items-end justify-center py-4">
          <Cart />
        </div>
        <div
          className={`${
            toggleMobileNavbar ? "translate-x-0" : "-translate-x-full"
          } absolute left-0 top-0 z-50 flex h-full w-full flex-col bg-white transition-all duration-300`}
        >
          <Link href="/" className="m-2 self-center p-3">
            <Image
              alt="Opt expert"
              src="/LogoMini.png"
              width={103}
              height={23}
            />
          </Link>
          <div className="my-2 flex items-center">
            <button
              className="ml-5 mr-7 h-5 w-5 flex-shrink-0 text-xl"
              onClick={() => {
                toggleSwitchMobileNavbar(false);
                toggleSwitchDarkOverlay(false);
              }}
            >
              <MenuClose />
            </button>
            <Search
              className="mr-5 h-9 w-full gap-3 bg-gray-300 text-black"
              inputClassName="text-sm placeholder:text-sm placeholder:text-gray-500"
            />
          </div>
          <ul className="ml-16 mt-10 flex flex-col gap-6 font-bold">
            {menuList.map((menuItem) => (
              <li key={menuItem.id}>
                <Link
                  onClick={() => {
                    toggleSwitchMobileNavbar(false);
                    toggleSwitchDarkOverlay(false);
                  }}
                  href={menuItem.href}
                >
                  {menuItem.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
