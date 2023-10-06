"use client";

import { useGetContentsQuery } from "@/redux/features/app_utils/contentSlice";
import { Alert, Spinner } from "@material-tailwind/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsInstagram, BsWhatsapp, BsYoutube } from "react-icons/bs";
import { FaTelegramPlane, FaTiktok } from "react-icons/fa";
import { SlSocialVkontakte } from "react-icons/sl";
import Social from "./ui/Social";

// const TABLE_ROWS = [
//   {
//     id: 1,
//     title: "telegram",
//     description: "https://web.telegram.org/a/",
//   },
//   {
//     id: 2,
//     title: "whatsapp",
//     description: "https://www.whatsapp.com/",
//   },
//   {
//     id: 3,
//     title: "vkontakte",
//     description: "https://www.vk.com/",
//   },
//   {
//     id: 4,
//     title: "tiktok",
//     description: "https://www.tiktok.com/",
//   },
//   {
//     id: 5,
//     title: "youtube",
//     description: "https://www.youtube.com/",
//   },
//   {
//     id: 6,
//     title: "instagram",
//     description: "https://www.instagram.com/",
//   },
// ];

const Footer = () => {
  const pathname = usePathname();

  const { data, isLoading, isSuccess, isError, error } = useGetContentsQuery();

  if (isLoading) {
    return <Spinner className="ml-40 mt-20 h-16 w-16 text-gray-900/50" />;
  } else if (isError) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Произошла ошибка при загрузке данных.";
    return (
      <Alert className="ml-40 mt-20" color="red">
        {errorMessage}
      </Alert>
    );
  } else if (isSuccess && data) {
    const TABLE_ROWS = Object.values(data?.entities!);
    const telegramLink = TABLE_ROWS.find(
      (row) => row?.title.toLowerCase() === "telegram",
    )!.description;
    const whatsappLink = TABLE_ROWS.find(
      (row) => row?.title.toLowerCase() === "whatsapp",
    )!.description;
    const vkontakteLink = TABLE_ROWS.find(
      (row) => row?.title.toLowerCase() === "vkontakte",
    )!.description;
    const tiktokLink = TABLE_ROWS.find(
      (row) => row?.title.toLowerCase() === "tiktok",
    )!.description;
    const youtubeLink = TABLE_ROWS.find(
      (row) => row?.title.toLowerCase() === "youtube",
    )!.description;
    const instagramLink = TABLE_ROWS.find(
      (row) => row?.title.toLowerCase() === "instagram",
    )!.description;
    const emailLink = TABLE_ROWS.find(
      (row) => row?.title.toLowerCase() === "email",
    )!.description;

    return (
      <footer>
        <div
          className={`flex w-full flex-col items-center justify-center gap-8 overflow-hidden ${
            pathname === "/"
              ? "bg-gradient-to-b from-bgGradient2 from-[-40%] to-black to-[20%]"
              : "bg-gradient-to-b from-bgGradient1 to-bgGradient2"
          }  px-5 py-9 text-white md:flex-row md:gap-0 md:divide-x-[1px] md:px-0 md:py-4 lg:py-8 xl:px-32 xl:py-12`}
        >
          <div className="md:pr-6 lg:pr-12 xl:pr-20">
            <h1 className="mb-2 text-center text-xl font-bold lg:mb-4 xl:mb-8 xl:text-[28px]">
              E-mail
            </h1>
            <Link
              href={`mailto:${emailLink}` || "#"}
              className="text-sm lg:text-base xl:text-xl"
            >
              {emailLink}
            </Link>
          </div>
          <div className="flex flex-col px-6 lg:px-12 xl:px-20">
            <h1 className="mb-2 text-center text-xl font-bold lg:mb-4 xl:mb-8 xl:text-[28px]">
              Whatsapp
            </h1>
            <Social href={whatsappLink || "#"}>
              <BsWhatsapp />
            </Social>
          </div>
          <div className="flex flex-col px-6 lg:px-12 xl:px-20">
            <h1 className="mb-2 text-center text-xl font-bold lg:mb-4 xl:mb-8 xl:text-[28px]">
              Telegram
            </h1>
            <Social href={telegramLink || "#"}>
              <FaTelegramPlane />
            </Social>
          </div>
          <div className="px-6 lg:px-12 xl:px-20">
            <h1 className="mb-2 text-center text-xl font-bold lg:mb-4 xl:mb-8 xl:text-[28px]">
              Соцсети
            </h1>
            <div className="flex gap-5">
              <Social href={vkontakteLink || "#"}>
                <SlSocialVkontakte />
              </Social>
              <Social href={tiktokLink || "#"}>
                <FaTiktok />
              </Social>
              <Social href={youtubeLink || "#"}>
                <BsYoutube />
              </Social>
              <Social href={instagramLink || "#"}>
                <BsInstagram />
              </Social>
            </div>
          </div>
        </div>
      </footer>
    );
  }
};

export default Footer;
