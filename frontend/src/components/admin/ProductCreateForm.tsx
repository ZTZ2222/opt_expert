"use client";

import { IProductCreate } from "@/interfaces/product.interface";
import { useGetCategoriesQuery } from "@/redux/features/category/categoriesSlice";
import { useGetSubcategoriesQuery } from "@/redux/features/category/subcategoriesSlice";
import { useCreateProductMutation } from "@/redux/features/product/productsSlice";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Option,
  Select,
  Switch,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SizeListCheckBoxes } from "../ui/SizeListCheckboxes";
import FileUpload from "./FileUpload";

const ProductCreateForm = () => {
  const router = useRouter();
  // Fetching categories and subcategories
  const {
    data: catsData,
    isLoading: catsIsLoading,
    isSuccess: catsIsSucces,
    isError: catsIsError,
  } = useGetCategoriesQuery();
  const {
    data: subsData,
    isLoading: subsIsLoading,
    isSuccess: subsIsSucces,
    isError: subsIsError,
  } = useGetSubcategoriesQuery();

  const [createProduct, { isLoading, isSuccess, isError, error }] =
    useCreateProductMutation();

  const [product, setProduct] = useState<IProductCreate>({} as IProductCreate);

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    createProduct(product);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.dismiss();
      toast.success("Товар успешно добавлен");
      router.push("/admin/products");
    } else if (isError) {
      toast.dismiss();
      toast.success(`Упс! Произошла ошибка! ${JSON.stringify(error)}`);
    }
  }, [isLoading, isSuccess, isError]);

  const handleChange = (field: keyof IProductCreate, value: any) => {
    setProduct(() => ({
      ...product,
      [field]: value,
    }));
  };

  const handleChangeImages = (images: string[]) => {
    setProduct(() => ({
      ...product,
      images: images,
    }));
  };

  return (
    <form
      onSubmit={handleSaveProduct}
      className="relative mx-4 mb-20 inline-flex gap-6 md:mx-6"
    >
      <Card className="inline-flex w-auto flex-col">
        <CardHeader className="m-6 flex flex-col gap-3" shadow={false}>
          {/* Статус товара */}
          <div className="absolute right-2 top-2 flex gap-2">
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="font-normal opacity-70"
            >
              {product.status || "Активный"}
            </Typography>
            <Switch
              value={product.status || "Активный"}
              crossOrigin={undefined}
              onChange={() => {
                product.status === "Активный"
                  ? handleChange("status", "Скрытый")
                  : handleChange("status", "Активный");
              }}
              color="green"
              defaultChecked
            />
          </div>
          {/* Общее */}
          <Typography
            variant="h4"
            color="black"
            className="font-bold leading-7"
          >
            Общее
          </Typography>
          <div className="m-2 p-1">
            <Typography
              variant="lead"
              color="blue-gray"
              className="font-normal opacity-70"
            >
              Наименование
            </Typography>
            <Input
              onChange={(e) => handleChange("name", e.target.value)}
              crossOrigin={undefined}
              label="Введите название товара"
            />
          </div>
          <div className="m-2 p-1">
            <Typography
              variant="lead"
              color="blue-gray"
              className="font-normal opacity-70"
            >
              Описание
            </Typography>
            <Textarea
              onBlur={(e) => handleChange("description", e.target.value)}
              label="Введите описание товара"
            />
          </div>
        </CardHeader>
        <CardBody>
          {/* Категории */}
          <Typography
            variant="h4"
            color="black"
            className="font-bold leading-7"
          >
            Категории
          </Typography>
          <div className="m-2 mb-12 grid grid-cols-1 gap-5 p-1 lg:grid-cols-2">
            <div>
              <Typography
                variant="lead"
                color="blue-gray"
                className="font-normal opacity-70"
              >
                Категория товара
              </Typography>
              {catsIsLoading && <Alert color="blue">Загрузка...</Alert>}
              {catsIsSucces && catsData && (
                <Select
                  onChange={(selectedCategory) =>
                    handleChange("category_id", Number(selectedCategory))
                  }
                  label="Выберите категорию"
                >
                  {catsData.ids.map((id) => (
                    <Option key={id} value={id.toString()}>
                      {catsData.entities[id]?.name}
                    </Option>
                  ))}
                </Select>
              )}
              {catsIsError && <Alert color="red">Произошла ошибка!</Alert>}
            </div>
            <div>
              <Typography
                variant="lead"
                color="blue-gray"
                className="font-normal opacity-70"
              >
                Подкатегория товара
              </Typography>
              {subsIsLoading && <Alert color="blue">Загрузка...</Alert>}
              {subsIsSucces && subsData && (
                <Select
                  onChange={(selectedSubCategory) =>
                    handleChange("sub_id", Number(selectedSubCategory))
                  }
                  label="Выберите подкатегорию"
                >
                  {subsData.ids.map((id) => (
                    <Option key={id} value={id.toString()}>
                      {subsData.entities[id]?.name}
                    </Option>
                  ))}
                </Select>
              )}
              {subsIsError && <Alert color="red">Произошла ошибка!</Alert>}
            </div>
          </div>
          {/* Медиа */}
          <Typography
            variant="h4"
            color="black"
            className="font-bold leading-7"
          >
            Медиа
          </Typography>
          <div className="m-2 p-1">
            <Typography
              variant="lead"
              color="blue-gray"
              className="font-normal opacity-70"
            >
              Изображение
            </Typography>
            <FileUpload onChange={handleChangeImages} />
          </div>
        </CardBody>
        <CardFooter>
          {/* Цена */}
          <Typography
            variant="h4"
            color="black"
            className="font-bold leading-7"
          >
            Цена
          </Typography>
          <div className="mb-12 flex flex-col gap-6 xl:flex-row">
            <div className="m-2 p-1">
              <Typography
                variant="lead"
                color="blue-gray"
                className="font-normal opacity-70"
              >
                Базовая цена (сом)
              </Typography>
              <Input
                onChange={(e) =>
                  handleChange("base_price", Number(e.target.value))
                }
                crossOrigin={undefined}
                label="Введите цену товара"
              />
            </div>
            <div className="m-2 p-1">
              <Typography
                variant="lead"
                color="blue-gray"
                className="font-normal opacity-70"
              >
                Цена со скидкой (сом)
              </Typography>
              <Input
                onChange={(e) =>
                  handleChange("sale_price", Number(e.target.value))
                }
                crossOrigin={undefined}
                label="Введите цену товара"
              />
            </div>
          </div>

          {/* Характеристики */}
          <Typography
            variant="h4"
            color="black"
            className="font-bold leading-7"
          >
            Характеристики
          </Typography>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="m-2 p-1">
              <Typography
                variant="lead"
                color="blue-gray"
                className="font-normal opacity-70"
              >
                Артикул
              </Typography>
              <Input
                onChange={(e) => handleChange("article", e.target.value)}
                crossOrigin={undefined}
                label="Введите артикул"
              />
            </div>
            <div className="m-2 p-1">
              <Typography
                variant="lead"
                color="blue-gray"
                className="font-normal opacity-70"
              >
                Страна производства
              </Typography>
              <Select
                onChange={(selected) =>
                  handleChange("product_origin", selected)
                }
                label="Выберите страну"
                size="lg"
              >
                <Option value="Кыргызстан">Кыргызстан</Option>
                <Option value="Китай">Китай</Option>
                <Option value="Турция">Турция</Option>
                <Option value="Россия">Россия</Option>
              </Select>
            </div>
            <div className="m-2 p-1">
              <Typography
                variant="lead"
                color="blue-gray"
                className="font-normal opacity-70"
              >
                Вес товара (грамм)
              </Typography>
              <Input
                onChange={(e) => handleChange("weight", Number(e.target.value))}
                crossOrigin={undefined}
                label="Введите вес товара"
              />
            </div>
            <div className="m-2 p-1">
              <Typography
                variant="lead"
                color="blue-gray"
                className="font-normal opacity-70"
              >
                Доступные размеры
              </Typography>
              <SizeListCheckBoxes product={product} setProduct={setProduct} />
            </div>
          </div>
          {/* Save & Cancel Buttons */}
          <div className="mt-12 flex flex-col items-center justify-center">
            <Typography variant="h6">Желаете ли сохранить товар?</Typography>
            <div className="mt-5 flex items-center justify-center gap-10">
              <Button
                type="submit"
                disabled={isLoading}
                color="green"
                className="h-10 w-32 capitalize"
              >
                Сохранить
              </Button>
              <Button
                onClick={() => {
                  router.push("/admin/products");
                }}
                className="h-10 w-32 capitalize"
              >
                Назад
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
};

export default ProductCreateForm;
