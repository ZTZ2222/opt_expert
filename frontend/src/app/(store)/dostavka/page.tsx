"use client";

import { useGetPageContentsQuery } from "@/redux/features/app_utils/pageContentSlice";
import { Spinner } from "@material-tailwind/react";

const Shipping = () => {
  const { data } = useGetPageContentsQuery();
  return (
    <main className="bg-gradient-to-bl from-bgCustomGradient1 to-bgCustomGradient2 text-customPurple">
      <section className="mx-auto mb-20 flex w-11/12 flex-col gap-6 md:gap-10 xl:mx-32 xl:w-auto xl:gap-12">
        <h1 className="self-center text-center text-2xl font-bold uppercase leading-9 text-black md:w-7/12 md:text-3xl lg:text-4xl">
          {data?.entities["доставка"]?.title || (
            <Spinner color="indigo" className="h-20 w-20" />
          )}
        </h1>
        <p className="px-4 indent-10 text-sm leading-5 md:text-base md:leading-7 xl:text-xl">
          {data?.entities["доставка"]?.paragraph1 || (
            <Spinner color="indigo" className="h-12 w-12" />
          )}
        </p>
        <ul className="mx-auto flex w-11/12 flex-col gap-10 md:w-2/3 lg:w-full lg:flex-row lg:gap-5 xl:w-11/12 xl:gap-16">
          <li className="flex flex-col gap-6 divide-y-[1px] divide-gray-500 rounded-lg border border-gray-500 p-3 xl:p-5">
            <h3 className="self-center text-xl font-bold uppercase leading-7 lg:text-[26px]">
              {data?.entities["доставка"]?.header1 || (
                <Spinner color="indigo" className="h-12 w-12" />
              )}
            </h3>
            <p className="text-sm md:text-base lg:text-lg xl:leading-7">
              {data?.entities["доставка"]?.body1 || (
                <Spinner color="indigo" className="h-12 w-12" />
              )}
            </p>
          </li>
          <li className="flex flex-col gap-6 divide-y-[1px] divide-gray-500 rounded-lg border border-gray-500 p-3 xl:p-5">
            <h3 className="self-center text-xl font-bold uppercase leading-7 lg:text-[26px]">
              {data?.entities["доставка"]?.header2 || (
                <Spinner color="indigo" className="h-12 w-12" />
              )}
            </h3>
            <p className="text-sm md:text-base lg:text-lg xl:leading-7">
              {data?.entities["доставка"]?.body2 || (
                <Spinner color="indigo" className="h-12 w-12" />
              )}
            </p>
          </li>
          <li className="flex flex-col gap-6 divide-y-[1px] divide-gray-500 rounded-lg border border-gray-500 p-3 xl:p-5">
            <h3 className="self-center text-xl font-bold uppercase leading-7 lg:text-[26px]">
              {data?.entities["доставка"]?.header3 || (
                <Spinner color="indigo" className="h-12 w-12" />
              )}
            </h3>
            <p className="text-sm md:text-base lg:text-lg xl:leading-7">
              {data?.entities["доставка"]?.body3 || (
                <Spinner color="indigo" className="h-12 w-12" />
              )}
            </p>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default Shipping;
