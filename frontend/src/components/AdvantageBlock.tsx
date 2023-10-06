import clsx from "clsx";
import Image from "next/image";
import { ReactNode } from "react";

interface Props {
  imageSrc: string;
  className?: string;
  children: ReactNode;
}

const AdvantageBlock = ({ imageSrc, className, children }: Props) => {
  return (
    <div
      className={clsx(
        "relative mt-10 flex flex-col items-center justify-center",
        className,
      )}
    >
      <div className="absolute top-0 h-[100px] w-[100px] -translate-y-10">
        <Image
          alt="Advantage"
          src={imageSrc}
          fill
          className="object-scale-down"
        />
      </div>
      <div className="flex h-40 w-full flex-col justify-end self-end rounded-lg bg-white px-3 py-9 text-center text-sm font-medium shadow-around shadow-primaryBlue">
        {children}
      </div>
    </div>
  );
};

export default AdvantageBlock;
