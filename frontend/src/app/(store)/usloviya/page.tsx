"use client";

import { useGetPageContentsQuery } from "@/redux/features/app_utils/pageContentSlice";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Spinner,
} from "@material-tailwind/react";
import { useState } from "react";

const TermsAndConditions = () => {
  const [open, setOpen] = useState(1);

  const { data } = useGetPageContentsQuery();

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  return (
    <main className="bg-gradient-to-bl from-bgCustomGradient1 to-bgCustomGradient2 text-customPurple">
      <section className="mx-auto mb-20 flex w-11/12 flex-col gap-6 md:gap-10 xl:mx-32 xl:w-auto xl:gap-12">
        <h1 className="self-center text-center text-2xl font-bold uppercase leading-9 text-black md:w-7/12 md:text-3xl lg:text-4xl">
          {data?.entities["условия сотрудничества"]?.title || (
            <Spinner color="indigo" className="h-20 w-20" />
          )}
        </h1>
        <div className="flex flex-col gap-3 px-4 text-sm md:text-base xl:gap-6 xl:text-xl">
          <p className="indent-10 leading-5 md:leading-7">
            {data?.entities["условия сотрудничества"]?.paragraph1 || (
              <Spinner color="indigo" className="h-12 w-12" />
            )}
          </p>
          <p className="leading-5 md:leading-7">
            {data?.entities["условия сотрудничества"]?.paragraph2 || (
              <Spinner color="indigo" className="h-12 w-12" />
            )}
          </p>
        </div>
        <ul className="mx-auto flex w-10/12 list-inside list-decimal flex-col gap-3 text-sm font-medium lg:text-base xl:w-7/12 xl:gap-6 xl:text-lg">
          <li>
            {data?.entities["условия сотрудничества"]?.paragraph3 || (
              <Spinner color="indigo" className="h-8 w-8" />
            )}
          </li>
          <li>
            {data?.entities["условия сотрудничества"]?.header1 || (
              <Spinner color="indigo" className="h-8 w-8" />
            )}
          </li>
          <li>
            {data?.entities["условия сотрудничества"]?.header2 || (
              <Spinner color="indigo" className="h-8 w-8" />
            )}
          </li>
          <li>
            {data?.entities["условия сотрудничества"]?.header3 || (
              <Spinner color="indigo" className="h-8 w-8" />
            )}
          </li>
        </ul>
      </section>
      <section className="mx-auto flex w-11/12 flex-col gap-6 lg:w-10/12 xl:mx-32 xl:w-auto">
        <h1 className="mb-5 text-center text-2xl font-bold uppercase leading-9 text-black md:text-3xl lg:text-4xl">
          Часто задаваемые вопросы
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
            {data?.entities["условия сотрудничества"]?.header4 || (
              <Spinner color="indigo" className="h-8 w-8" />
            )}
            <span className="ml-auto">{open === 1 ? "▲" : "▼"}</span>
          </AccordionHeader>
          <AccordionBody className="pt-0 text-base font-normal">
            {data?.entities["условия сотрудничества"]?.body4 || (
              <Spinner color="indigo" className="h-8 w-8" />
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
            {data?.entities["условия сотрудничества"]?.header4 || (
              <Spinner color="indigo" className="h-8 w-8" />
            )}
            <span className="ml-auto">{open === 2 ? "▲" : "▼"}</span>
          </AccordionHeader>
          <AccordionBody className="pt-0 text-base font-normal">
            {data?.entities["условия сотрудничества"]?.body5 || (
              <Spinner color="indigo" className="h-8 w-8" />
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
            {data?.entities["условия сотрудничества"]?.header6 || (
              <Spinner color="indigo" className="h-8 w-8" />
            )}
            <span className="ml-auto">{open === 3 ? "▲" : "▼"}</span>
          </AccordionHeader>
          <AccordionBody className="pt-0 text-base font-normal">
            {data?.entities["условия сотрудничества"]?.body6 || (
              <Spinner color="indigo" className="h-8 w-8" />
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
            {data?.entities["условия сотрудничества"]?.header7 || (
              <Spinner color="indigo" className="h-8 w-8" />
            )}
            <span className="ml-auto">{open === 4 ? "▲" : "▼"}</span>
          </AccordionHeader>
          <AccordionBody className="pt-0 text-base font-normal">
            {data?.entities["условия сотрудничества"]?.body7 || (
              <Spinner color="indigo" className="h-8 w-8" />
            )}
          </AccordionBody>
        </Accordion>
        <div />
      </section>
    </main>
  );
};

export default TermsAndConditions;
