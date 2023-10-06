"use client";

import { IOrder } from "@/interfaces/order.interface";
import {
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from "@/redux/features/order/ordersSlice";
import {
  CalendarDaysIcon,
  DocumentCheckIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Dialog,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  params: { orderId: string };
};

const ViewOrderPage = ({ params }: Props) => {
  const router = useRouter();

  const TABLE_HEAD = ["Товар", "Артикул", "Кол-во", "Цена", "Итого"];

  // Dialog handler button
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const { order: orderById } = useGetOrdersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      order: data?.entities[Number(params.orderId)],
    }),
  });

  const [updateOrder, { isLoading, isSuccess, isError, error }] =
    useUpdateOrderMutation();

  const [order, setOrder] = useState<IOrder>({} as IOrder);

  const statusList: IOrder["status"][] = [
    "Оформлен",
    "Оплачен",
    "В пути",
    "Доставлен",
    "Возврат",
  ];

  const handleChangeStatus = (status: IOrder["status"]) => {
    handleOpen();

    const orderUpdate = { ...order, status: status };
    updateOrder(orderUpdate);
  };

  useEffect(() => {
    if (orderById) {
      setOrder(orderById);
    }
    if (isSuccess) {
      toast.dismiss();
      toast.success("Заказ успешно обновлен");
      router.push("/admin/orders");
    } else if (isError) {
      toast.dismiss();
      toast.success(`Упс! Произошла ошибка! ${JSON.stringify(error)}`);
    }
  }, [isLoading, isSuccess, isError, error, router, orderById]);

  return (
    <Card className="my-12 w-2/4 min-w-max">
      <CardHeader className="">
        <List>
          <ListItem className="flex justify-between gap-3">
            <Typography variant="h6" color="blue-gray" className="font-bold">
              Заказ #{order.id}
            </Typography>
            <Chip
              variant="ghost"
              size="sm"
              value={order.status || "Оформлен"}
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
            <Button
              onClick={handleOpen}
              variant="outlined"
              className="flex gap-2 px-3 py-2"
            >
              <DocumentCheckIcon className="h-4 w-4" />
              Изменить статус
            </Button>
            <Dialog
              open={open}
              handler={handleOpen}
              size="sm"
              className="flex max-w-fit flex-nowrap gap-3"
            >
              <Select label="Выберите статус заказа">
                {statusList.map((status) => (
                  <Option
                    key={status}
                    onClick={() => handleChangeStatus(status)}
                  >
                    {status}
                  </Option>
                ))}
              </Select>
              <Button onClick={handleOpen}>Назад</Button>
            </Dialog>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Имя клиента
            <ListItemSuffix>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold"
              >
                {order.full_name || ""}
              </Typography>
            </ListItemSuffix>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PhoneIcon className="h-5 w-5" />
            </ListItemPrefix>
            Телефон
            <ListItemSuffix>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold"
              >
                {order.telephone || ""}
              </Typography>
            </ListItemSuffix>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <CalendarDaysIcon className="h-5 w-5" />
            </ListItemPrefix>
            Дата оформления
            <ListItemSuffix>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold"
              >
                {new Date(order.created_at!).toLocaleString("ru-RU", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </Typography>
            </ListItemSuffix>
          </ListItem>
        </List>
      </CardHeader>
      <CardBody className="min-h-[50vh] w-full">
        <Typography variant="small" color="blue-gray" className="font-bold">
          Список заказов
        </Typography>
        <table className="mt-4 min-w-max table-auto text-left">
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
            {order.items &&
              order.items.map((item, index) => {
                const isLast = index === order.items.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                if (item.product)
                  return (
                    <tr key={item.product.name}>
                      {/* Название */}
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            variant="rounded"
                            src={
                              item.product.images
                                ? item.product.images[0]
                                : "/Products/placeholder-image.png"
                            }
                            alt={item.product.name || ""}
                            size="lg"
                          />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="truncate font-normal"
                          >
                            {item.product.name || ""}
                          </Typography>
                        </div>
                      </td>
                      {/* Артикул */}
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {item.product.article || ""}
                        </Typography>
                      </td>
                      {/* Кол-во */}
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {item.quantity} серий
                        </Typography>
                      </td>
                      {/* Цена */}
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {item.product.sale_price ||
                            item.product.base_price ||
                            0}{" "}
                          сом
                        </Typography>
                      </td>
                      {/* Итого */}
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {item.quantity *
                            (item.product.sale_price ||
                              item.product.base_price ||
                              0)}{" "}
                          сом
                        </Typography>
                      </td>
                    </tr>
                  );
              })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default ViewOrderPage;
