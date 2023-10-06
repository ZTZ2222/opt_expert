"use client";

import { Button } from "@/components/ui/Button";
import QtyBtn from "@/components/ui/QtyBtn";
import { IOrderItem } from "@/interfaces/order.interface";
import { totalPriceSelector } from "@/redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "@/redux/features/order/ordersSlice";
import { useActions, useAppSelector } from "@/redux/hooks";
import { Card, Input, Typography } from "@material-tailwind/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const NewOrderPage = () => {
  const router = useRouter();

  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalPrice = useAppSelector(totalPriceSelector);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const orderItems: IOrderItem[] = cartItems.map((item) => ({
    product_id: item.product.id,
    quantity: item.qty,
  }));

  const { increment, decrement } = useActions();

  const [createOrder, { isLoading, isSuccess, isError, error }] =
    useCreateOrderMutation();

  const handleCreateOrder = () => {
    createOrder({
      full_name: name,
      telephone: phone,
      status: "Оформлен",
      items: orderItems,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.dismiss();
      toast.success("Заказ успешно оформлен");
      router.push("/");
    } else if (isError) {
      toast.dismiss();
      toast.success(`Упс! Произошла ошибка! ${JSON.stringify(error)}`);
    }
  }, [isLoading, isSuccess, isError, toast]);
  return (
    <section className="mb-10 flex w-full flex-col">
      <div className="flex w-1/2 flex-col self-center rounded-lg border border-gray-600 p-5">
        <h1 className="mb-8 text-center text-[26px] font-bold uppercase leading-7">
          Ваш заказ
        </h1>
        <Card className="m-8 flex flex-col gap-5">
          <Typography variant="h5" color="blue-gray" className="text-center">
            Для оформления заказа введите ваши данные
          </Typography>
          <Input
            crossOrigin={undefined}
            label="Введите ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            crossOrigin={undefined}
            label="Введите ваш телефон (+996)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Card>
        {cartItems.map((item) => (
          <div
            key={item.product.id}
            className={`mb-10 flex ${
              item.qty === 0 && "hidden"
            } justify-center gap-10 text-xs sm:text-sm md:text-xl lg:text-sm xl:text-xl`}
          >
            <div className="relative h-56 w-56">
              <Image
                alt={item.product.name}
                src={
                  item.product.images[0] || "/Products/placeholder-image.png"
                }
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-lg object-contain"
              />
            </div>
            <div className="flex flex-col gap-1 sm:gap-3 lg:gap-1 xl:gap-3">
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
        <div className="flex min-w-max max-w-max flex-col gap-5 self-center">
          <span className="text-3xl font-bold">Итого: {totalPrice} сом</span>
          <Button
            disabled={isLoading}
            onClick={handleCreateOrder}
            className="px-10 py-5 text-lg font-medium"
          >
            Заказать
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewOrderPage;
