"use client";

import { useGetPageContentsQuery } from "@/redux/features/app_utils/pageContentSlice";
import { Carousel, Spinner } from "@material-tailwind/react";
import Image from "next/image";
import { LeftArrow, RightArrow } from "./svg";
import { Button } from "./ui/Button";

export default function DefaultCarousel() {
  const { data } = useGetPageContentsQuery();
  return (
    <Carousel
      autoplay={true}
      loop={true}
      autoplayDelay={5000}
      transition={{ duration: 0.8 }}
      className="mx-5 mb-12 h-[540px] w-full self-center rounded-lg md:mx-0 md:mb-28 md:h-[156px] lg:h-[204px] xl:h-[300px]"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-0 left-2/4 z-50 flex -translate-x-2/4 gap-2 md:hidden">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-2 cursor-pointer rounded-full transition-all content-[''] ${
                activeIndex === i
                  ? "w-5 bg-gradient-to-r from-bgButton1 to-bgButton2"
                  : "w-2 bg-gray-100"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
      prevArrow={({ handlePrev }) => (
        <LeftArrow
          onClick={handlePrev}
          className="!absolute top-2/4 hidden -translate-y-2/4 cursor-pointer md:left-4 md:block md:h-9 md:w-7 xl:left-8 xl:h-12 xl:w-10"
        />
      )}
      nextArrow={({ handleNext }) => (
        <RightArrow
          onClick={handleNext}
          className="!absolute top-2/4 hidden -translate-y-2/4 cursor-pointer md:right-4 md:block md:h-9 md:w-7 xl:right-8 xl:h-12 xl:w-10"
        />
      )}
    >
      <div className="flex justify-center bg-transparent">
        <div className="flex h-[501px] w-9/12 flex-col items-center justify-evenly rounded-lg bg-gradient-to-r from-sliderBG1 to-sliderBG2 text-black md:h-[156px] md:flex-row lg:h-[204px] lg:w-10/12 xl:h-auto">
          <div className="flex flex-col items-center">
            <h1 className="my-3 w-4/5 text-center text-lg font-bold md:my-0 md:mb-3 md:text-xl lg:mb-5 lg:text-3xl xl:mb-10 xl:text-[40px]">
              {data?.entities["баннер1"]?.paragraph1 || (
                <Spinner color="indigo" className="h-12 w-12" />
              )}
            </h1>
            <p className="my-1 text-xs md:my-0 md:mb-3 md:text-sm lg:mb-5 lg:text-lg xl:mb-12 xl:text-[22px]">
              {data?.entities["баннер1"]?.paragraph2 || (
                <Spinner color="indigo" className="h-8 w-8" />
              )}
            </p>
            <Button
              paddingLess
              className="my-4 h-10 w-[200px] text-sm font-semibold text-white md:my-0 md:h-7 md:w-48 md:text-sm lg:h-10 lg:w-60 lg:text-base xl:h-[50px] xl:w-[300px] xl:text-lg"
            >
              {data?.entities["баннер1"]?.paragraph3 || "Подробнее"}
            </Button>
          </div>
          <Image
            alt="Туфли"
            src={
              data?.entities["баннер1"]?.backgroundImage ||
              "/Products/placeholder-image.png"
            }
            width={235}
            height={300}
            className="rounded-[7px] bg-transparent md:h-[156px] md:w-32 lg:h-auto lg:w-40 xl:w-[235px]"
          />
        </div>
      </div>
      <div className="flex justify-center bg-transparent">
        <div className="flex h-[501px] w-9/12 flex-col items-center gap-16 rounded-lg bg-gradient-to-r from-sliderBG3 to-sliderBG4 text-white md:h-[156px] md:flex-row md:justify-evenly lg:h-[204px] lg:w-10/12 xl:h-[300px]">
          <div className="order-last flex md:order-first md:w-1/4">
            <Image
              alt="Bottle"
              src={
                data?.entities["баннер2"]?.backgroundImage ||
                "/Products/placeholder-image.png"
              }
              width={182}
              height={232}
              className="w-[137px] -translate-y-10 translate-x-4 rounded-[7px] shadow-lg md:h-3/5 md:w-3/5 md:-translate-y-3 md:translate-x-3 lg:px-0 xl:w-[182px] xl:-translate-y-5 xl:translate-x-5"
            />
            <Image
              alt="Glasses"
              src={
                data?.entities["баннер2"]?.header1 ||
                "/Products/placeholder-image.png"
              }
              width={182}
              height={232}
              className="w-[137px] -translate-x-4 translate-y-10 rounded-[7px] shadow-lg md:h-3/5 md:w-3/5 md:-translate-x-3 md:translate-y-3 lg:px-0 xl:w-[182px] xl:-translate-x-5 xl:translate-y-5"
            />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="my-4 text-2xl font-bold md:my-0 md:mb-5 md:text-xl lg:mb-7 lg:text-3xl xl:mb-10 xl:text-[40px]">
              {data?.entities["баннер2"]?.paragraph1 || (
                <Spinner color="indigo" className="h-12 w-12" />
              )}
            </h1>
            <p className="text-xs font-medium md:mb-5 md:text-sm lg:mb-7 lg:text-lg xl:mb-12 xl:text-[22px]">
              {data?.entities["баннер2"]?.paragraph2 || (
                <Spinner color="indigo" className="h-8 w-8" />
              )}
            </p>
            <Button
              paddingLess
              className="my-8 h-10 w-[200px] text-sm font-semibold text-white md:my-0 md:h-7 md:w-48 md:text-sm lg:h-10 lg:w-60 lg:text-base xl:h-[50px] xl:w-[300px] xl:text-lg"
            >
              {data?.entities["баннер1"]?.paragraph3 || "Подробнее"}
            </Button>
          </div>
        </div>
      </div>
    </Carousel>
  );
}
