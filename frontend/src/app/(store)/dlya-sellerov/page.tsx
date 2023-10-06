"use client";

import { useGetPageContentsQuery } from "@/redux/features/app_utils/pageContentSlice";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Spinner,
} from "@material-tailwind/react";
import { useState } from "react";

const ForSellers = () => {
  const [open, setOpen] = useState(1);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  const { data } = useGetPageContentsQuery();
  return (
    <main className="bg-gradient-to-bl from-bgCustomGradient1 to-bgCustomGradient2 text-customPurple">
      <section className="mx-auto mb-20 flex w-11/12 flex-col gap-3 sm:w-10/12 md:gap-5 lg:w-8/12">
        <h1 className="mb-5 self-center text-center text-2xl font-bold uppercase leading-9 text-black md:w-7/12 md:text-3xl lg:text-4xl">
          {data?.entities["для селлеров"]?.title || (
            <Spinner color="indigo" className="h-20 w-20" />
          )}
        </h1>
        <Accordion
          open={open === 1}
          className="rounded-lg border border-blue-gray-100 px-4"
        >
          <AccordionHeader
            onClick={() => handleOpen(1)}
            className={`border-b-0 transition-colors ${
              open === 1 ? "text-purple-700 hover:!text-purple-500" : ""
            }`}
          >
            {data?.entities["для селлеров"]?.header1 || (
              <Spinner color="indigo" className="h-12 w-12" />
            )}
            <span className="ml-auto">{open === 1 ? "▲" : "▼"}</span>
          </AccordionHeader>
          <AccordionBody className="pt-0 text-base font-normal">
            {data?.entities["для селлеров"]?.body1 || (
              <Spinner color="indigo" className="h-12 w-12" />
            )}
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          className="rounded-lg border border-blue-gray-100 px-4"
        >
          <AccordionHeader
            onClick={() => handleOpen(2)}
            className={`border-b-0 transition-colors ${
              open === 2 ? "text-purple-700 hover:!text-purple-500" : ""
            }`}
          >
            {data?.entities["для селлеров"]?.header2 || (
              <Spinner color="indigo" className="h-12 w-12" />
            )}
            <span className="ml-auto">{open === 2 ? "▲" : "▼"}</span>
          </AccordionHeader>
          <AccordionBody className="pt-0 text-base font-normal">
            {data?.entities["для селлеров"]?.body2 || (
              <Spinner color="indigo" className="h-12 w-12" />
            )}
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 3}
          className="rounded-lg border border-blue-gray-100 px-4"
        >
          <AccordionHeader
            onClick={() => handleOpen(3)}
            className={`border-b-0 transition-colors ${
              open === 3 ? "text-purple-700 hover:!text-purple-500" : ""
            }`}
          >
            {data?.entities["для селлеров"]?.header3 || (
              <Spinner color="indigo" className="h-12 w-12" />
            )}
            <span className="ml-auto">{open === 3 ? "▲" : "▼"}</span>
          </AccordionHeader>
          <AccordionBody className="pt-0 text-base font-normal">
            {data?.entities["для селлеров"]?.body3 || (
              <Spinner color="indigo" className="h-12 w-12" />
            )}
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 4}
          className="rounded-lg border border-blue-gray-100 px-4"
        >
          <AccordionHeader
            onClick={() => handleOpen(4)}
            className={`border-b-0 transition-colors ${
              open === 4 ? "text-purple-700 hover:!text-purple-500" : ""
            }`}
          >
            {data?.entities["для селлеров"]?.header4 || (
              <Spinner color="indigo" className="h-12 w-12" />
            )}
            <span className="ml-auto">{open === 4 ? "▲" : "▼"}</span>
          </AccordionHeader>
          <AccordionBody className="pt-0 text-base font-normal">
            {data?.entities["для селлеров"]?.body4 || (
              <Spinner color="indigo" className="h-12 w-12" />
            )}
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 5}
          className="rounded-lg border border-blue-gray-100 px-4"
        >
          <AccordionHeader
            onClick={() => handleOpen(5)}
            className={`border-b-0 transition-colors ${
              open === 5 ? "text-purple-700 hover:!text-purple-500" : ""
            }`}
          >
            {data?.entities["для селлеров"]?.header5 || (
              <Spinner color="indigo" className="h-12 w-12" />
            )}
            <span className="ml-auto">{open === 5 ? "▲" : "▼"}</span>
          </AccordionHeader>
          <AccordionBody className="pt-0 text-base font-normal">
            {data?.entities["для селлеров"]?.body5 || (
              <Spinner color="indigo" className="h-12 w-12" />
            )}
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 6}
          className="rounded-lg border border-blue-gray-100 px-4"
        >
          <AccordionHeader
            onClick={() => handleOpen(6)}
            className={`border-b-0 transition-colors ${
              open === 6 ? "text-purple-700 hover:!text-purple-500" : ""
            }`}
          >
            {data?.entities["для селлеров"]?.header6 || (
              <Spinner color="indigo" className="h-12 w-12" />
            )}
            <span className="ml-auto">{open === 6 ? "▲" : "▼"}</span>
          </AccordionHeader>
          <AccordionBody className="pt-0 text-base font-normal">
            {data?.entities["для селлеров"]?.body6 || (
              <Spinner color="indigo" className="h-12 w-12" />
            )}
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 7}
          className="rounded-lg border border-blue-gray-100 px-4"
        >
          <AccordionHeader
            onClick={() => handleOpen(7)}
            className={`border-b-0 transition-colors ${
              open === 7 ? "text-purple-700 hover:!text-purple-500" : ""
            }`}
          >
            {data?.entities["для селлеров"]?.header7 || (
              <Spinner color="indigo" className="h-12 w-12" />
            )}
            <span className="ml-auto">{open === 7 ? "▲" : "▼"}</span>
          </AccordionHeader>
          <AccordionBody className="pt-0 text-base font-normal">
            {data?.entities["для селлеров"]?.body7 || (
              <Spinner color="indigo" className="h-12 w-12" />
            )}
          </AccordionBody>
        </Accordion>
      </section>
    </main>
  );
};

export default ForSellers;
