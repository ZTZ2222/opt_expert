"use client";

import { useActions, useAppSelector } from "@/redux/hooks";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  ChevronDownIcon,
  Cog8ToothIcon,
  PowerIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import {
  ShoppingBagIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Card,
  Chip,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React from "react";
import ListViewNavigations from "../ui/ListViewNavigations";

const SideNav = () => {
  const toggleMobileNavbar = useAppSelector(
    (state) => state.toggle.toggleMobileNavbar,
  );
  const { toggleSwitchMobileNavbar } = useActions();

  const { push } = useRouter();

  const [open, setOpen] = React.useState(0);

  const { logout } = useActions();

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  const contentMenu = [
    {
      label: "Главная",
      link: "/main",
    },
    {
      label: "О нас",
      link: "/o-nas",
    },
    {
      label: "Условия",
      link: "/usloviya",
    },
    {
      label: "Для селлеров",
      link: "/dlya-sellerov",
    },
    {
      label: "Доставка",
      link: "/dostavka",
    },
    {
      label: "Фабрика",
      link: "/fabrika",
    },
    {
      label: "Баннеры",
      link: "/banners",
    },
    {
      label: "Соцсети",
      link: "/socials",
    },
  ];

  const storeMenu = [
    {
      label: "Категории",
      link: "/categories",
    },
    {
      label: "Подкатегории",
      link: "/subs",
    },
    {
      label: "Товары",
      link: "/products",
    },
    {
      label: "Заказы",
      link: "/orders",
    },
    {
      label: "Размеры",
      link: "/sizes",
    },
  ];

  return (
    <Card
      className={`${
        toggleMobileNavbar
          ? "translate-x-0"
          : "-translate-x-full md:-translate-x-0"
      } absolute z-10 mr-5 h-screen max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 transition-all md:relative md:flex md:h-[calc(100vh-2rem)] md:w-full`}
    >
      <button
        className="h-5 w-5 flex-shrink-0 text-xl md:hidden"
        onClick={() => {
          toggleSwitchMobileNavbar(false);
        }}
      >
        <XMarkIcon className="h-6 w-6 fill-black" />
      </button>
      <div
        onClick={() => push("/admin")}
        className="mb-2 flex items-center gap-4 p-4"
      >
        <UsersIcon className="h-10 w-10 text-gray-900" />
        <Typography variant="h5" color="blue-gray">
          Панель управления
        </Typography>
      </div>
      {/* <div className="p-2">
        <Input
          crossOrigin={undefined}
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          label="Поиск"
        />
      </div> */}
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <SquaresPlusIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Контент сайта
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListViewNavigations menuList={contentMenu} />
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Магазин
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListViewNavigations menuList={storeMenu} />
            </List>
          </AccordionBody>
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem onClick={() => push(`/admin/requests`)}>
          <ListItemPrefix>
            <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
          </ListItemPrefix>
          Заявки
          <ListItemSuffix>
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Профиль
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog8ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Настройки
        </ListItem>
        <ListItem
          onClick={() => {
            logout();
            push("/auth");
          }}
        >
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Выйти
        </ListItem>
      </List>
    </Card>
  );
};

export default SideNav;
