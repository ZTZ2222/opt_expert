"use client";

import {
  totalCartItemsSelector,
  totalPriceSelector,
} from "@/redux/features/cart/cartSlice";
import { useActions, useAppSelector } from "@/redux/hooks";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { ShopCart } from "../svg";
import { Button } from "./Button";
import QtyBtn from "./QtyBtn";

interface Props {
  className?: string;
}

const Cart: React.FC<Props> = ({ className }) => {
  const { push } = useRouter();
  const toggleCart = useAppSelector((state) => state.toggle.toggleCart);
  const totalItems = useAppSelector(totalCartItemsSelector);
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalPrice = useAppSelector(totalPriceSelector);

  const { increment, decrement, toggleSwitchCart, toggleSwitchDarkOverlay } =
    useActions();

  return (
    <>
      <button
        onClick={() => {
          toggleSwitchCart(true);
          toggleSwitchDarkOverlay(true);
        }}
        className={clsx(
          "group relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-bl from-purple-500 to-blue-600 transition-all hover:scale-105 hover:ring-2 hover:ring-teal-600 hover:ring-offset-2",
          className,
        )}
      >
        <ShopCart className="w-full pr-[2px] text-[21px]" />
        {!!totalItems && (
          <div
            key={totalItems}
            className="absolute -right-2 -top-2 flex h-6 w-6 animate-pingOnce items-center justify-center rounded-full bg-red-500 font-bold text-white"
          >
            {totalItems}
          </div>
        )}
      </button>
      {totalItems ? (
        <div
          className={`animate-vanish ${
            toggleCart ? "translate-x-0" : "translate-x-full"
          } fixed right-0 top-0 z-50 flex h-screen w-full flex-col items-center overflow-hidden rounded-l-md bg-gray-100 text-darkBlue transition-all duration-500 lg:w-2/5`}
        >
          <button
            onClick={() => {
              toggleSwitchCart(false);
              toggleSwitchDarkOverlay(false);
            }}
            className="ml-auto p-3"
          >
            <IoClose className="text-5xl" />
          </button>
          <h1 className="mb-8 text-[26px] font-bold uppercase leading-7">
            Ваша корзина
          </h1>
          {cartItems.map((item) => (
            <div
              key={item.product.id}
              className={`mb-10 flex w-full ${
                item.qty === 0 && "hidden"
              } justify-evenly text-xs sm:text-sm md:text-xl lg:text-sm xl:text-xl`}
            >
              <div className="relative h-full w-1/3 md:w-1/4 lg:w-1/3">
                <Image
                  alt={item.product.name}
                  src={item.product.images[0]}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="flex w-1/2 flex-col gap-1 sm:gap-3 lg:gap-1 xl:gap-3">
                <h4 className="truncate">{item.product.name}</h4>
                <div className="flex gap-2">
                  <span className="text-gray-600">Страна пр-ва:</span>
                  <span>{item.product.product_origin}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-600">Кол-во серий:</span>
                  <span>{item.qty}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-600">Цена за серию:</span>
                  <span>
                    {item.product.sale_price || item.product.base_price} сом
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-600">Итого:</span>
                  <span>
                    {(item.product.sale_price || item.product.base_price) *
                      item.qty}{" "}
                    сом
                  </span>
                </div>
                <QtyBtn
                  className="animate-vanish"
                  onIncrease={() => increment(item.product)}
                  onDeacrease={() => decrement(item.product)}
                  qty={item.qty}
                />
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-5">
            <span className="text-3xl font-bold">Итого: {totalPrice} сом</span>
            <Button
              onClick={() => {
                push("/new-order");
                toggleSwitchCart(false);
                toggleSwitchDarkOverlay(false);
              }}
              className="px-10 py-5 text-lg font-medium"
            >
              Оформить заказ
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`animate-vanish  ${
            toggleCart ? "translate-x-0" : "translate-x-full"
          } fixed right-0 top-0 z-50 flex h-screen w-full flex-col rounded-l-md bg-gray-100 text-darkBlue transition-all duration-500 lg:w-2/5`}
        >
          <button
            onClick={() => {
              toggleSwitchCart(false);
              toggleSwitchDarkOverlay(false);
            }}
            className="ml-auto p-3"
          >
            <IoClose className="text-5xl" />
          </button>
          <div className="flex animate-vanish flex-col items-center gap-8">
            <h1 className="text-xl font-bold uppercase leading-7 lg:text-2xl xl:text-[28px]">
              в корзине пока пусто
            </h1>
            <p className="text-sm leading-6 lg:text-base">
              Воспользуйтесь поиском, чтобы <br /> найти нужный Вам товар
            </p>
            <div className="relative h-52 w-52 lg:h-64 lg:w-64">
              <Image
                alt="cart"
                src="/CartBg.png"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
