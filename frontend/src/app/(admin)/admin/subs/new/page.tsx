"use client";

import { ISubcategoryCreate } from "@/interfaces/category.interface";
import { useCreateSubcategoryMutation } from "@/redux/features/category/subcategoriesSlice";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CreateSubPage = () => {
  const router = useRouter();

  const [createSubcategory, { isLoading, isSuccess, isError, error }] =
    useCreateSubcategoryMutation();

  const [sub, setSub] = useState<ISubcategoryCreate>({} as ISubcategoryCreate);

  const handleSaveSub = (e: React.FormEvent) => {
    e.preventDefault();
    createSubcategory(sub);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.dismiss();
      toast.success("Подкатегория успешно добавлена");
      router.push("/admin/subs");
    } else if (isError) {
      toast.dismiss();
      toast.success(`Упс! Произошла ошибка! ${JSON.stringify(error)}`);
    }
  }, [isSuccess, isError, error, router]);

  const handleChange = (field: keyof ISubcategoryCreate, value: any) => {
    setSub(() => ({
      ...sub,
      [field]: value,
    }));
  };

  return (
    <form
      onSubmit={handleSaveSub}
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
        <CardFooter>
          {/* Save & Cancel Buttons */}
          <div className="mt-12 flex flex-col items-center justify-center">
            <Typography variant="h6">
              Желаете ли сохранить подкатегорию?
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
                  router.push("/admin/subs");
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

export default CreateSubPage;
