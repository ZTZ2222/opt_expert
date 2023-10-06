"use client";

import { IPageContent } from "@/interfaces/content.interface";
import {
  useGetPageContentsQuery,
  useUpdatePageContentMutation,
} from "@/redux/features/app_utils/pageContentSlice";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BannersPage = () => {
  const { data } = useGetPageContentsQuery();
  const [updateContent, { isSuccess, isError }] =
    useUpdatePageContentMutation();

  const [banner1, setBanner1] = useState<IPageContent>({} as IPageContent);
  const [banner2, setBanner2] = useState<IPageContent>({} as IPageContent);

  useEffect(() => {
    if (data) {
      setBanner1(data.entities["баннер1"]!);
      setBanner2(data.entities["баннер2"]!);
    }
    if (isSuccess) {
      toast.dismiss();
      toast.success("Успешно изменено");
    } else if (isError) {
      toast.dismiss();
      toast.error("Упс! Произошла ошибка!");
    }
  }, [data, isSuccess, isError]);

  const handleChangeBanner1 = (field: keyof IPageContent, value: string) => {
    setBanner1(() => ({
      ...banner1,
      [field]: value,
    }));
  };

  const handleChangeBanner2 = (field: keyof IPageContent, value: string) => {
    setBanner2(() => ({
      ...banner2,
      [field]: value,
    }));
  };

  const handleUpdateBanner1 = () => {
    updateContent(banner1);
  };

  const handleUpdateBanner2 = () => {
    updateContent(banner2);
  };

  return (
    <>
      <Card className="mt-20 min-w-fit max-w-xl">
        <CardHeader>
          <Typography variant="h4" className="p-5 text-center">
            Настройки страницы о нас
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-6">
          {/* Баннер №1 */}
          <Card className="flex flex-col gap-3 p-5">
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Баннер №1
            </Typography>
            <Input
              crossOrigin={undefined}
              label="Большой текст баннера №1"
              value={banner1.paragraph1 || ""}
              onChange={(e) =>
                handleChangeBanner1("paragraph1", e.target.value)
              }
            />
            <Input
              crossOrigin={undefined}
              label="Малый текст баннера №1"
              value={banner1.paragraph2 || ""}
              onChange={(e) =>
                handleChangeBanner1("paragraph2", e.target.value)
              }
            />
            <Input
              crossOrigin={undefined}
              label="Текст кнопки баннера №1"
              value={banner1.paragraph3 || ""}
              onChange={(e) =>
                handleChangeBanner1("paragraph3", e.target.value)
              }
            />
            <Input
              crossOrigin={undefined}
              label="Фоновая картинка баннера №1"
              value={banner1.backgroundImage || ""}
              onChange={(e) =>
                handleChangeBanner1("backgroundImage", e.target.value)
              }
            />
            <Button onClick={handleUpdateBanner1}>Изменить</Button>
          </Card>
          {/* Баннер №2 */}
          <Card className="flex flex-col gap-3 p-5">
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Баннер №2
            </Typography>
            <Input
              crossOrigin={undefined}
              label="Большой текст баннера №2"
              value={banner2.paragraph1 || ""}
              onChange={(e) =>
                handleChangeBanner2("paragraph1", e.target.value)
              }
            />
            <Input
              crossOrigin={undefined}
              label="Малый текст баннера №2"
              value={banner2.paragraph2 || ""}
              onChange={(e) =>
                handleChangeBanner2("paragraph2", e.target.value)
              }
            />
            <Input
              crossOrigin={undefined}
              label="Текст кнопки баннера №2"
              value={banner2.paragraph3 || ""}
              onChange={(e) =>
                handleChangeBanner2("paragraph3", e.target.value)
              }
            />
            <Input
              crossOrigin={undefined}
              label="Фоновая картинка 1 баннера №2"
              value={banner2.backgroundImage || ""}
              onChange={(e) =>
                handleChangeBanner2("backgroundImage", e.target.value)
              }
            />
            <Input
              crossOrigin={undefined}
              label="Фоновая картинка 2 баннера №2"
              value={banner2.header1 || ""}
              onChange={(e) => handleChangeBanner2("header1", e.target.value)}
            />
            <Button onClick={handleUpdateBanner2}>Изменить</Button>
          </Card>
        </CardBody>
      </Card>
    </>
  );
};

export default BannersPage;
