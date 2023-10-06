import clsx from "clsx";
import Link from "next/link";
import React from "react";

type VariantType = "dark" | "white";

const getVariant = (variant?: VariantType) => {
  switch (variant) {
    case "dark":
      return "bg-bgSocial hover:bg-purple-700 hover:bg-opacity-70 hover:text-gray-300 hover:shadow-lg hover:shadow-purple-600 rounded-[10px] h-8 w-8 xl:h-10 xl:w-10 text-base xl:text-xl";
    case "white":
      return "bg-customGray hover:bg-purple-900 text-white hover:shadow-lg hover:shadow-black rounded-[20px] h-12 w-12 text-2xl";

    default:
      return "bg-bgSocial hover:bg-purple-700 hover:bg-opacity-70 hover:text-gray-300 hover:shadow-lg hover:shadow-purple-600 rounded-[10px] h-8 w-8 xl:h-10 xl:w-10 text-base xl:text-xl";
  }
};

interface SocialProps {
  children: React.ReactNode;
  href: string;
  variant?: VariantType;
}

const Social: React.FC<SocialProps> = ({ children, href, variant }) => {
  return (
    <Link
      href={href}
      className={clsx(
        `${getVariant(
          variant,
        )} flex items-center justify-center self-center transition-all`,
      )}
    >
      {children}
    </Link>
  );
};

export default Social;
