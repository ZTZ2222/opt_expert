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
  CardFooter,
  CardHeader,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MainPageSettings = () => {
  const { data } = useGetPageContentsQuery();
  const [updateContent, { isSuccess, isError }] =
    useUpdatePageContentMutation();

  const [content, setContent] = useState<IPageContent>({} as IPageContent);

  useEffect(() => {
    if (data) {
      setContent(data.entities["главная"]!);
    }
    if (isSuccess) {
      toast.dismiss();
      toast.success("Успешно изменено");
    } else if (isError) {
      toast.dismiss();
      toast.error("Упс! Произошла ошибка!");
    }
  }, [data, isSuccess, isError]);

  const handleChange = (field: keyof IPageContent, value: string) => {
    setContent(() => ({
      ...content,
      [field]: value,
    }));
  };

  const handleUpdate = () => {
    updateContent(content);
  };

  return (
    <>
      <Card className="mt-20 w-96">
        <CardHeader>
          <Typography variant="h4" className="p-5 text-center">
            Настройки главной страницы
          </Typography>
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Большой текст
          </Typography>
          <Textarea
            label="Большой текст"
            value={content.paragraph1 || ""}
            onChange={(e) => handleChange("paragraph1", e.target.value)}
          />
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Малый текст
          </Typography>
          <Textarea
            label="Малый текст"
            value={content.paragraph2 || ""}
            onChange={(e) => handleChange("paragraph2", e.target.value)}
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button onClick={handleUpdate}>Изменить</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default MainPageSettings;
