"use client";

import { useGetRouteMappingsQuery } from "@/redux/features/app_utils/routeMappingSlice";
import { Alert, Spinner } from "@material-tailwind/react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BreadcrumbArrow } from "./svg";

export interface BreadcrumbItem {
  label: string;
  link: string;
}

const Breadcrumb = ({ className }: { className?: string }) => {
  const path = usePathname();
  const segments = path.split("/").filter((segment) => segment !== "");

  const { data, isLoading, isError, error } = useGetRouteMappingsQuery();

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
  } else if (data) {
    return (
      <nav className={clsx("flex text-sm xl:text-xl", className)}>
        <ul className="flex flex-wrap gap-2 md:gap-3">
          <li className="flex gap-2 md:gap-3">
            <Link
              href="/"
              className="flex items-center justify-center focus:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 fill-darkBlue transition-all duration-300 hover:fill-bgButton1 xl:h-7 xl:w-7"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </Link>
          </li>
          {segments.map((segment, index) => (
            <li key={index} className="flex items-center gap-2 md:gap-3">
              <BreadcrumbArrow className="h-[10px] w-[6px]" />
              {index === segments.length - 1 ? (
                <span className="shrink-0 cursor-not-allowed text-gray-500">
                  {data.entities[segment]?.name || segment}
                </span>
              ) : (
                <Link
                  href={`/${segments.slice(0, index + 1).join("/")}`}
                  className="shrink-0 capitalize text-darkBlue transition-all duration-300 hover:text-bgButton1 focus:scale-95"
                >
                  {data.entities[segment]?.name || segment}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    );
  }
};

export default Breadcrumb;
