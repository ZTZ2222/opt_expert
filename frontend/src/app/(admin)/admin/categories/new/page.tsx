"use client";

import FileUpload from "@/components/admin/FileUpload";
import { ICategoryCreate } from "@/interfaces/category.interface";
import { useCreateCategoryMutation } from "@/redux/features/category/categoriesSlice";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CreateCategoryPage = () => {
  const router = useRouter();

  const [createCategory, { isLoading, isSuccess, isError, error }] =
    useCreateCategoryMutation();

  const [category, setCategory] = useState<ICategoryCreate>(
    {} as ICategoryCreate,
  );

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    createCategory(category);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.dismiss();
      toast.success("Категория успешно добавлена");
      router.push("/admin/categories");
    } else if (isError) {
      toast.dismiss();
      toast.success(`Упс! Произошла ошибка! ${JSON.stringify(error)}`);
    }
  }, [isLoading, isSuccess, error, router, isError]);

  const handleChange = (field: keyof ICategoryCreate, value: any) => {
    setCategory(() => ({
      ...category,
      [field]: value,
    }));
  };

  const handleChangeImages = (images: string[]) => {
    const image = images[0];
    setCategory(() => ({
      ...category,
      image: image,
    }));
  };

  return (
    <form
      onSubmit={handleSaveCategory}
      className="relative mx-4 mb-20 inline-flex gap-6 md:mx-6"
    >
      <Card className="inline-flex w-auto flex-col">
        <CardHeader className="m-6 flex flex-col gap-3" shadow={false}>
          {/* Наименование */}
          <Typography
            variant="h4"
            color="black"
            className="font-bold leading-7"
          >
            Наименование
          </Typography>
          <div className="py-1">
            <Input
              onChange={(e) => handleChange("name", e.target.value)}
              crossOrigin={undefined}
              label="Введите название категории"
            />
          </div>
        </CardHeader>
        <CardBody>
          {/* Изображение */}
          <Typography
            variant="h4"
            color="black"
            className="mb-3 font-bold leading-7"
          >
            Изображение
          </Typography>
          <FileUpload onChange={handleChangeImages} />
        </CardBody>
        <CardFooter>
          {/* Save & Cancel Buttons */}
          <div className="mt-12 flex flex-col items-center justify-center">
            <Typography variant="h6">
              Желаете ли сохранить категорию?
            </Typography>
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
                  router.push("/admin/categories");
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

export default CreateCategoryPage;
