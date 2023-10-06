"use client";

import AdvantageBlock from "@/components/AdvantageBlock";
import { useGetPageContentsQuery } from "@/redux/features/app_utils/pageContentSlice";
import { Spinner } from "@material-tailwind/react";
import Image from "next/image";

const AboutUs = () => {
  const { data } = useGetPageContentsQuery();

  return (
    <main className="flex flex-col gap-6 bg-gradient-to-bl from-bgCustomGradient1 to-bgCustomGradient2 text-customPurple md:gap-10 xl:gap-12">
      <h1 className="w-7/12 self-center text-center text-2xl font-bold uppercase text-black md:text-4xl md:leading-9">
        {data?.entities["о нас"]?.title || (
          <Spinner color="indigo" className="h-20 w-20" />
        )}
      </h1>
      <div className="mx-auto flex w-10/12 flex-col gap-3 text-sm lg:text-base xl:w-7/12 xl:gap-6 xl:text-lg">
        <p className="indent-10 leading-5 md:leading-7">
          {data?.entities["о нас"]?.paragraph1 || (
            <Spinner color="indigo" className="h-12 w-12" />
          )}
        </p>
        <p className="leading-5 md:leading-7">
          {data?.entities["о нас"]?.paragraph2 || (
            <Spinner color="indigo" className="h-12 w-12" />
          )}
        </p>
        <p className="hidden leading-5 md:leading-7 lg:block">
          {data?.entities["о нас"]?.paragraph3 || (
            <Spinner color="indigo" className="h-12 w-12" />
          )}
        </p>
      </div>
      <ul className="mx-5 grid w-auto grid-cols-1 gap-7 sm:mx-10 md:mx-20 md:grid-cols-3 xl:mx-32 xl:grid-cols-5">
        <li>
          <AdvantageBlock
            imageSrc={
              data?.entities["о нас"]?.body1 ||
              "/Products/placeholder-image.png"
            }
          >
            <p className="line-clamp-2 cursor-default hover:line-clamp-none">
              {data?.entities["о нас"]?.header1 || (
                <Spinner color="indigo" className="h-12 w-12" />
              )}
            </p>
          </AdvantageBlock>
        </li>
        <li>
          <AdvantageBlock
            imageSrc={
              data?.entities["о нас"]?.body2 ||
              "/Products/placeholder-image.png"
            }
          >
            <p className="line-clamp-2 cursor-default hover:line-clamp-none">
              {data?.entities["о нас"]?.header2 || (
                <Spinner color="indigo" className="h-12 w-12" />
              )}
            </p>
          </AdvantageBlock>
        </li>
        <li>
          <AdvantageBlock
            imageSrc={
              data?.entities["о нас"]?.body3 ||
              "/Products/placeholder-image.png"
            }
          >
            <p className="line-clamp-2 cursor-default hover:line-clamp-none">
              {data?.entities["о нас"]?.header3 || (
                <Spinner color="indigo" className="h-12 w-12" />
              )}
            </p>
          </AdvantageBlock>
        </li>
        <li>
          <AdvantageBlock
            imageSrc={
              data?.entities["о нас"]?.body4 ||
              "/Products/placeholder-image.png"
            }
          >
            <p className="line-clamp-2 cursor-default hover:line-clamp-none">
              {data?.entities["о нас"]?.header4 || (
                <Spinner color="indigo" className="h-12 w-12" />
              )}
            </p>
          </AdvantageBlock>
        </li>
        <li>
          <AdvantageBlock
            imageSrc={
              data?.entities["о нас"]?.body5 ||
              "/Products/placeholder-image.png"
            }
          >
            <p className="line-clamp-2 cursor-default hover:line-clamp-none">
              {data?.entities["о нас"]?.header5 || (
                <Spinner color="indigo" className="h-12 w-12" />
              )}
            </p>
          </AdvantageBlock>
        </li>
      </ul>
      <div className="relative h-[160px] w-auto sm:h-[220px] md:mx-20 md:h-[340px] lg:h-[450px] xl:mx-32 xl:h-[600px]">
        <Image
          alt="fulfilment"
          src={
            data?.entities["о нас"]?.backgroundImage ||
            "/Products/placeholder-image.png"
          }
          fill
          className="rounded-xl border-2 border-gray-300 object-cover"
        />
      </div>
      <div />
    </main>
  );
};

export default AboutUs;
