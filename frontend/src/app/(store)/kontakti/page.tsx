"use client";

import { Button } from "@/components/ui/Button";
import Social from "@/components/ui/Social";
import { useGetContentsQuery } from "@/redux/features/app_utils/contentSlice";
import { Alert, Input, Spinner, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { BsInstagram, BsWhatsapp, BsYoutube } from "react-icons/bs";
import { FaTelegramPlane, FaTiktok } from "react-icons/fa";
import { SlSocialVkontakte } from "react-icons/sl";

const Contacts = () => {
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
      <main className="bg-gradient-to-bl from-bgCustomGradient1 to-bgCustomGradient2 text-customPurple">
        <section className="mx-auto mb-20 flex w-11/12 flex-col gap-6 sm:w-10/12 md:gap-10 lg:w-10/12">
          <h1 className="self-center text-center text-2xl font-bold uppercase leading-9 text-black md:w-7/12 md:text-3xl lg:text-4xl">
            контакты
          </h1>
          <div className="flex gap-20">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold uppercase">
                Оставить заявку на подбор товаров
              </h2>
              <form className="mb-2 mt-8 flex w-80 max-w-screen-lg flex-col items-center rounded-xl border border-gray-600 p-8 sm:w-96">
                <Typography color="gray" className="my-1 font-normal">
                  Укажите номер телефона WhatsApp
                </Typography>
                <Input
                  color="purple"
                  size="lg"
                  crossOrigin={undefined}
                  label="Номер телефона WhatsApp*"
                />
                <Typography color="gray" className="my-1 font-normal">
                  Опишите, в свободной форме, но максимально подробно, какие
                  товары вас интересуют
                </Typography>
                <Input
                  color="purple"
                  size="lg"
                  crossOrigin={undefined}
                  label="Какие товары Вас интересуют?"
                />
                <Button className="mt-5 h-12 w-1/2">Отправить</Button>
              </form>
            </div>
            <div className="flex flex-col gap-3 divide-y-[1px] divide-bgSocial">
              <div className="flex flex-col px-6 lg:px-12 xl:px-20">
                <h1 className="my-2 text-center text-xl font-bold lg:mb-4 xl:mb-8 xl:text-[28px]">
                  Наш WhatsApp
                </h1>
                <Social variant="white" href={whatsappLink || "#"}>
                  <BsWhatsapp />
                </Social>
              </div>
              <div className="flex flex-col px-6 lg:px-12 xl:px-20">
                <h1 className="my-2 text-center text-xl font-bold lg:mb-4 xl:mb-8 xl:text-[28px]">
                  Наш Telegram
                </h1>
                <Social variant="white" href={telegramLink || "#"}>
                  <FaTelegramPlane />
                </Social>
              </div>
              <div className="px-6 lg:px-12 xl:px-20">
                <h1 className="my-2 text-center text-xl font-bold lg:mb-4 xl:mb-8 xl:text-[28px]">
                  Наши соцсети
                </h1>
                <div className="flex gap-5">
                  <Social variant="white" href={vkontakteLink || "#"}>
                    <SlSocialVkontakte />
                  </Social>
                  <Social variant="white" href={tiktokLink || "#"}>
                    <FaTiktok />
                  </Social>
                  <Social variant="white" href={youtubeLink || "#"}>
                    <BsYoutube />
                  </Social>
                  <Social variant="white" href={instagramLink || "#"}>
                    <BsInstagram />
                  </Social>
                </div>
              </div>
              <div className="flex flex-col md:px-6 lg:px-12 xl:px-20">
                <h1 className="my-2 text-center text-xl font-bold lg:mb-4 xl:mb-8 xl:text-[28px]">
                  E-mail
                </h1>
                <Link
                  href={`mailto:${emailLink}` || "#"}
                  className="self-center text-sm lg:text-base xl:text-xl"
                >
                  optexpert.business@gmail.com
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
};

export default Contacts;
