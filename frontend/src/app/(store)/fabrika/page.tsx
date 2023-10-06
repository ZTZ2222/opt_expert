"use client";

import { useGetPageContentsQuery } from "@/redux/features/app_utils/pageContentSlice";
import { Spinner } from "@material-tailwind/react";

const Factory = () => {
  const { data } = useGetPageContentsQuery();
  return (
    <main className="bg-gradient-to-bl from-bgCustomGradient1 to-bgCustomGradient2 text-customPurple">
      <section className="mx-auto mb-20 flex w-11/12 flex-col gap-6 sm:w-10/12 md:gap-10 lg:w-8/12">
        <h1 className="self-center text-center text-2xl font-bold uppercase leading-9 text-black md:w-7/12 md:text-3xl lg:text-4xl">
          {data?.entities["фабрика"]?.title || (
            <Spinner color="indigo" className="h-20 w-20" />
          )}
        </h1>
        <div className="flex h-40 items-center justify-center sm:h-48 md:mx-20 md:h-64 lg:h-[275px] xl:mx-40 xl:h-96 2xl:mx-32">
          <iframe
            src={
              data?.entities["фабрика"]?.backgroundImage ||
              "/Products/placeholder-image.png"
            }
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="h-full w-full rounded-[10px]"
          ></iframe>
        </div>
        <p className="indent-8 text-sm leading-5 md:text-base md:leading-7 xl:text-xl">
          {data?.entities["фабрика"]?.paragraph1 || (
            <Spinner color="indigo" className="h-12 w-12" />
          )}
        </p>
        <p className="text-sm leading-5 md:text-base md:leading-7 xl:text-xl">
          {data?.entities["фабрика"]?.paragraph2 || (
            <Spinner color="indigo" className="h-12 w-12" />
          )}
        </p>
        <p className="text-sm leading-5 md:text-base md:leading-7 xl:text-xl">
          {data?.entities["фабрика"]?.paragraph3 || (
            <Spinner color="indigo" className="h-12 w-12" />
          )}
        </p>
      </section>
    </main>
  );
};

export default Factory;
