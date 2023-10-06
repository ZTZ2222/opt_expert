"use client";

import { ISizeCreate } from "@/interfaces/product.interface";
import { useCreateSizeMutation } from "@/redux/features/product/sizeSlice";
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

const AddNewSizePage = () => {
  const router = useRouter();

  const [createSize, { isLoading, isSuccess, isError, error }] =
    useCreateSizeMutation();

  const [size, setSize] = useState<ISizeCreate>({} as ISizeCreate);

  const handleSaveSize = (e: React.FormEvent) => {
    e.preventDefault();
    createSize(size);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.dismiss();
      toast.success("Размер успешно добавлен");
      router.push("/admin/sizes");
    } else if (isError) {
      toast.dismiss();
      toast.success(`Упс! Произошла ошибка! ${JSON.stringify(error)}`);
    }
  }, [isSuccess, isError, error, router]);

  const handleChange = (field: keyof ISizeCreate, value: any) => {
    setSize(() => ({
      ...size,
      [field]: value,
    }));
  };

  return (
    <form
      onSubmit={handleSaveSize}
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
              label="Введите размер"
            />
          </div>
        </CardHeader>
        <CardFooter>
          {/* Save & Cancel Buttons */}
          <div className="flex flex-col items-center justify-center">
            <Typography variant="h6">Желаете ли сохранить размер?</Typography>
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
                  router.push("/admin/sizes");
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

export default AddNewSizePage;
