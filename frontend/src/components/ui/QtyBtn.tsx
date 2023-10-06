"use client";

import clsx from "clsx";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { Button } from "./Button";

interface Props {
  onIncrease: () => void;
  onDeacrease: () => void;
  qty: number;
  className?: string;
}

const QtyBtn = (props: Props) => {
  return (
    <div className={clsx("flex gap-3 text-2xl", props.className)}>
      <Button
        variant="cart"
        className="flex h-10 w-10 items-center justify-center md:h-12 md:w-12"
        onClick={props.onDeacrease}
        paddingLess
      >
        {props.qty === 1 ? <BsTrash3 /> : <AiOutlineMinus />}
      </Button>
      <p className="flex h-10 w-12 items-center justify-center rounded-md border border-gray-400 md:h-12 md:w-14">
        {props.qty}
      </p>
      <Button
        variant="cart"
        paddingLess
        className="flex h-10 w-10 items-center justify-center md:h-12 md:w-12"
        onClick={props.onIncrease}
      >
        <AiOutlinePlus />
      </Button>
    </div>
  );
};

export default QtyBtn;
