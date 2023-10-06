"use client";
import { IProduct } from "@/interfaces/product.interface";
import { productQtyInCartSelector } from "@/redux/features/cart/cartSlice";
import { useActions, useAppSelector } from "@/redux/hooks";
import clsx from "clsx";
import { Button } from "./Button";
import QtyBtn from "./QtyBtn";

interface Props {
  className?: string;
  product: IProduct;
}

const AddToCart: React.FC<Props> = ({ className, product }) => {
  const qty = useAppSelector(productQtyInCartSelector(product.id));

  const { increment, decrement } = useActions();

  if (!qty)
    return (
      <Button
        onClick={() => increment(product)}
        className={clsx(
          "h-12 w-36 animate-vanish text-sm text-white xl:text-base",
          className,
        )}
      >
        Добавить в корзину
      </Button>
    );
  return (
    <QtyBtn
      className={clsx("animate-vanish", className)}
      onIncrease={() => increment(product)}
      onDeacrease={() => decrement(product)}
      qty={qty}
    />
  );
};

export default AddToCart;
