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

const UsloviyaPage = () => {
  const { data } = useGetPageContentsQuery();
  const [updateContent, { isSuccess, isError }] =
    useUpdatePageContentMutation();

  const [content, setContent] = useState<IPageContent>({} as IPageContent);

  useEffect(() => {
    if (data) {
      setContent(data.entities["условия сотрудничества"]!);
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
      <Card className="mt-20 min-w-fit max-w-fit">
        <CardHeader>
          <Typography variant="h4" className="p-5 text-center">
            Настройки страницы условия сотрудничества
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
            {/* Параграф №2 */}
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Параграф №2
            </Typography>
            <Textarea
              label="Параграф №2"
              value={content.paragraph2 || ""}
              onChange={(e) => handleChange("paragraph2", e.target.value)}
            />
          </Card>
          <Card className="flex flex-col gap-3 p-5">
            {/* Условие №1 */}
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Условие №1
            </Typography>
            <Input
              crossOrigin={undefined}
              label="Условие №1"
              value={content.paragraph3 || ""}
              onChange={(e) => handleChange("paragraph3", e.target.value)}
            />
            {/* Условие №2 */}
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Условие №2
            </Typography>
            <Input
              crossOrigin={undefined}
              label="Условие №2"
              value={content.header1 || ""}
              onChange={(e) => handleChange("header1", e.target.value)}
            />
            {/* Условие №3 */}
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Условие №3
            </Typography>
            <Input
              crossOrigin={undefined}
              label="Условие №3"
              value={content.header2 || ""}
              onChange={(e) => handleChange("header2", e.target.value)}
            />
            {/* Условие №4 */}
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Условие №4
            </Typography>
            <Input
              crossOrigin={undefined}
              label="Условие №4"
              value={content.header3 || ""}
              onChange={(e) => handleChange("header3", e.target.value)}
            />
          </Card>
          <Card className="flex flex-col gap-3 p-5">
            {/* Вопрос-Ответ №1 */}
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Вопрос-Ответ №1
            </Typography>
            <Input
              crossOrigin={undefined}
              label="Вопрос №1"
              value={content.header4 || ""}
              onChange={(e) => handleChange("header4", e.target.value)}
            />
            <Textarea
              label="Ответ №1"
              value={content.body4 || ""}
              onChange={(e) => handleChange("body4", e.target.value)}
            />
            {/* Вопрос-Ответ №2 */}
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Вопрос-Ответ №2
            </Typography>
            <Input
              crossOrigin={undefined}
              label="Вопрос №2"
              value={content.header5 || ""}
              onChange={(e) => handleChange("header5", e.target.value)}
            />
            <Textarea
              label="Ответ №2"
              value={content.body5 || ""}
              onChange={(e) => handleChange("body5", e.target.value)}
            />
            {/* Вопрос-Ответ №3 */}
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Вопрос-Ответ №3
            </Typography>
            <Input
              crossOrigin={undefined}
              label="Вопрос №3"
              value={content.header6 || ""}
              onChange={(e) => handleChange("header6", e.target.value)}
            />
            <Textarea
              label="Ответ №3"
              value={content.body6 || ""}
              onChange={(e) => handleChange("body6", e.target.value)}
            />
            {/* Вопрос-Ответ №4 */}
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Вопрос-Ответ №4
            </Typography>
            <Input
              crossOrigin={undefined}
              label="Вопрос №4"
              value={content.header7 || ""}
              onChange={(e) => handleChange("header7", e.target.value)}
            />
            <Textarea
              label="Ответ №4"
              value={content.body7 || ""}
              onChange={(e) => handleChange("body7", e.target.value)}
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

export default UsloviyaPage;
