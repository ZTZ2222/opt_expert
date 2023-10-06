import { IOrder } from "@/interfaces/order.interface";
import { useDeleteOrderMutation } from "@/redux/features/order/ordersSlice";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { Dictionary } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface Props {
  ordersList: Dictionary<IOrder>;
}

const OrdersList = ({ ordersList }: Props) => {
  const { push } = useRouter();

  const TABLE_HEAD = [
    "ID Заказа",
    "Товары",
    "Создан",
    "Имя клиента",
    "Телефон",
    "Итого",
    "Статус",
    "Действие",
  ];

  const [deleteOrder, { isSuccess: deleteIsSuccess, isError: deleteIsError }] =
    useDeleteOrderMutation();

  useEffect(() => {
    if (deleteIsSuccess) {
      toast.dismiss();
      toast.success("Заказ успешно удален");
    } else if (deleteIsError) {
      toast.dismiss();
      toast.error("Упс! Произошла ошибка!");
    }
  }, [deleteIsSuccess, deleteIsError]);

  const listOfOrders = Object.values(ordersList);

  return (
    <table className="mt-4 w-3/4 min-w-max table-auto text-left">
      <thead>
        <tr>
          {TABLE_HEAD.map((head) => (
            <th
              key={head}
              className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
              >
                {head}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {listOfOrders.map((order, index) => {
          const isLast = index === listOfOrders.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
          if (order)
            return (
              <tr key={order.id} className="text-center">
                {/* Номер заказа */}
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="truncate font-normal"
                  >
                    Заказ #{order.id}
                  </Typography>
                </td>
                {/* Товары */}
                <td className={classes}>
                  {order.items.length === 1 ? (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal opacity-70"
                    >
                      {order.items[0].product?.name}
                    </Typography>
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal opacity-70"
                    >
                      {order.items[0]?.product?.name || ""} и еще{" "}
                      {order.items.length - 1} товаров
                    </Typography>
                  )}
                </td>
                {/* Дата добавления */}
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal opacity-70"
                  >
                    {new Date(order.created_at!).toLocaleString("ru-RU", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </Typography>
                </td>
                {/* Имя Клиента */}
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal opacity-70"
                  >
                    {order.full_name}
                  </Typography>
                </td>
                {/* Телефон */}
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal opacity-70"
                  >
                    {order.telephone}
                  </Typography>
                </td>
                {/* Итого */}
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal opacity-70"
                  >
                    {order.items.reduce((accumulator, item) => {
                      const subtotal =
                        item.quantity *
                        (item.product?.sale_price || item.product?.base_price!);
                      return accumulator + subtotal;
                    }, 0)}{" "}
                    сом
                  </Typography>
                </td>
                {/* Статус */}
                <td className={classes}>
                  <div className="w-max">
                    <Chip
                      variant="ghost"
                      size="sm"
                      value={order.status}
                      color={
                        order.status === "Оформлен"
                          ? "blue"
                          : order.status === "Оплачен"
                          ? "indigo"
                          : order.status === "В пути"
                          ? "amber"
                          : order.status === "Доставлен"
                          ? "green"
                          : order.status === "Возврат"
                          ? "red"
                          : "purple"
                      }
                    />
                  </div>
                </td>
                {/* Действие */}
                <td className={classes}>
                  <div className="flex gap-0">
                    <Tooltip content="Изменить заказ">
                      <IconButton
                        variant="text"
                        size="sm"
                        onClick={() => push(`/admin/orders/${order.id}`)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Удалить заказ">
                      <IconButton
                        variant="text"
                        size="sm"
                        onClick={() => deleteOrder(order.id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            );
        })}
      </tbody>
    </table>
  );
};

export default OrdersList;
