import TabsUI from "@/components/ui/Tabs";
import { countryDict } from "@/dict";
import { IProduct } from "@/interfaces/product.interface";
import { useDeleteProductMutation } from "@/redux/features/product/productsSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  AdjustmentsVerticalIcon,
  CalendarIcon,
  EyeIcon,
  EyeSlashIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  IconButton,
  Input,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { Dictionary } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  productsList: Dictionary<IProduct>;
}

const ProductsList = ({ productsList }: Props) => {
  const { push } = useRouter();

  const TABLE_HEAD = [
    "Название/Артикул",
    "Категория",
    "Подкатегория",
    "Цена",
    "Размеры",
    "Вес",
    "Страна",
    "Статус",
    "Добавлен",
    "Действие",
  ];

  const [
    deleteProduct,
    { isSuccess: deleteIsSuccess, isError: deleteIsError },
  ] = useDeleteProductMutation();
  const [searchText, setSearchText] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");

  const filteredProducts = Object.values(productsList).filter((product) =>
    product!.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const filteredAndTabbedRows = filteredProducts.filter((product) =>
    selectedTab == "all"
      ? true
      : selectedTab === "active"
      ? product!.status === "Активный"
      : product!.status !== "Активный",
  );

  useEffect(() => {
    if (deleteIsSuccess) {
      toast.dismiss();
      toast.success("Товар успешно удален");
    } else if (deleteIsError) {
      toast.dismiss();
      toast.error("Упс! Произошла ошибка!");
    }
  }, [deleteIsSuccess, deleteIsError]);
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <TabsUI onTabChange={setSelectedTab} />
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            {/* Календарь */}
            <Button
              color="blue-gray"
              variant="outlined"
              className="flex items-center gap-1 px-3"
              size="sm"
            >
              <CalendarIcon strokeWidth={2} className="h-5 w-5" />
              Дата
            </Button>
            {/* Фильтры */}
            <Button
              color="blue-gray"
              className="flex items-center gap-1 px-3"
              size="sm"
            >
              <AdjustmentsVerticalIcon strokeWidth={2} className="h-5 w-5" />
              Фильтры
            </Button>
          </div>
          {/* Поиск */}
          <div className="w-full p-2 md:w-96">
            <Input
              crossOrigin={undefined}
              label="Поиск товара"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
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
            {filteredAndTabbedRows.map((product, index) => {
              const isLast = index === filteredAndTabbedRows.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";
              if (product)
                return (
                  <tr key={product.name} className="text-center">
                    {/* Название/Артикул */}
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          variant="rounded"
                          src={
                            product.images
                              ? product.images[0]
                              : "/Products/placeholder-image.png"
                          }
                          alt={product.name || ""}
                          size="xl"
                        />
                        <div className="flex w-48 flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="truncate font-normal"
                          >
                            {product.name || ""}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {product.article || ""}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    {/* Категория */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {product.category.name || ""}
                      </Typography>
                    </td>
                    {/* Подкатегория */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {product.sub.name || ""}
                      </Typography>
                    </td>
                    {/* Цена */}
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {(product.sale_price &&
                            product.sale_price + " сом") ||
                            ""}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className={`font-normal opacity-70 ${
                            product.sale_price && "line-through"
                          }`}
                        >
                          {product.base_price || ""} сом
                        </Typography>
                      </div>
                    </td>
                    {/* Размеры */}
                    <td className={classes}>
                      <div className="flex max-w-[80px] flex-wrap gap-[6px]">
                        {product.sizes.map((item: string, idx: number) => (
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                            key={idx}
                          >
                            {item || ""}
                          </Typography>
                        ))}
                      </div>
                    </td>
                    {/* Вес */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {product.weight || ""} гр
                      </Typography>
                    </td>
                    {/* Страна */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {(product.product_origin &&
                          countryDict[product.product_origin.toLowerCase()]) ||
                          product.product_origin ||
                          ""}
                      </Typography>
                    </td>
                    {/* Статус */}
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={product.status || "Активный"}
                          color={
                            product.status === "Активный"
                              ? "green"
                              : "blue-gray"
                          }
                        />
                      </div>
                    </td>
                    {/* Дата добавления */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {new Date(product.created_at!).toLocaleString("ru-RU", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }) || ""}
                      </Typography>
                    </td>
                    {/* Действие */}
                    <td className={classes}>
                      <div className="flex gap-0">
                        <Tooltip content="Изменить товар">
                          <IconButton
                            variant="text"
                            size="sm"
                            onClick={() =>
                              push(`/admin/products/${product.slug_en}`)
                            }
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        {product.status === "Активный" ? (
                          <Tooltip content="Скрыть товар">
                            <IconButton variant="text" size="sm">
                              <EyeIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip content="Отобразить товар">
                            <IconButton variant="text" size="sm">
                              <EyeSlashIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip content="Удалить товар">
                          <IconButton
                            variant="text"
                            size="sm"
                            onClick={() => deleteProduct(product.id!)}
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
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Страница 1 из 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Назад
          </Button>
          <Button variant="outlined" size="sm">
            Вперед
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductsList;
