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
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DostavkaPage = () => {
  const { data } = useGetPageContentsQuery();
  const [updateContent, { isSuccess, isError }] =
    useUpdatePageContentMutation();

  const [content, setContent] = useState<IPageContent>({} as IPageContent);

  useEffect(() => {
    if (data) {
      setContent(data.entities["доставка"]!);
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
      <Card className="mt-20 min-w-fit max-w-xl">
        <CardHeader>
          <Typography variant="h4" className="p-5 text-center">
            Настройки страницы доставка
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-6">
          <Card className="flex flex-col gap-3 p-5">
            {/* Параграф №1 */}
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Параграф №1
            </Typography>
            <Textarea
              label="Параграф №1"
              value={content.paragraph1 || ""}
              onChange={(e) => handleChange("paragraph1", e.target.value)}
            />
          </Card>
          <Card className="flex flex-col gap-3 p-5">
            {/* Страна №1 */}
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Страна №1
            </Typography>
            <Input
              crossOrigin={undefined}
              label="Вопрос №1"
              value={content.header1 || ""}
              onChange={(e) => handleChange("header1", e.target.value)}
            />
            <Textarea
              label="Ответ №1"
              value={content.body1 || ""}
              onChange={(e) => handleChange("body1", e.target.value)}
            />
            {/* Страна №2 */}
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Страна №2
            </Typography>
            <Input
              crossOrigin={undefined}
              label="Вопрос №2"
              value={content.header2 || ""}
              onChange={(e) => handleChange("header2", e.target.value)}
            />
            <Textarea
              label="Ответ №2"
              value={content.body2 || ""}
              onChange={(e) => handleChange("body2", e.target.value)}
            />
            {/* Страна №3 */}
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Страна №3
            </Typography>
            <Input
              crossOrigin={undefined}
              label="Вопрос №3"
              value={content.header3 || ""}
              onChange={(e) => handleChange("header3", e.target.value)}
            />
            <Textarea
              label="Ответ №3"
              value={content.body3 || ""}
              onChange={(e) => handleChange("body3", e.target.value)}
            />
          </Card>
        </CardBody>
        <CardFooter className="pt-0">
          <Button onClick={handleUpdate}>Изменить</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default DostavkaPage;
