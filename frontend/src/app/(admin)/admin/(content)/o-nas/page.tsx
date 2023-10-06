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

const AboutUsPage = () => {
  const { data } = useGetPageContentsQuery();
  const [updateContent, { isSuccess, isError }] =
    useUpdatePageContentMutation();

  const [content, setContent] = useState<IPageContent>({} as IPageContent);

  useEffect(() => {
    if (data) {
      setContent(data.entities["о нас"]!);
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
            Настройки страницы о нас
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
            {/* Параграф №3 */}
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Параграф №3
            </Typography>
            <Textarea
              label="Параграф №3"
              value={content.paragraph3 || ""}
              onChange={(e) => handleChange("paragraph3", e.target.value)}
            />
          </Card>
          <Card className="flex flex-col gap-3 p-5">
            {/* Преимущество №1 */}
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Преимущество №1
            </Typography>
            <Input
              crossOrigin={undefined}
              label="Преимущество №1"
              value={content.header1 || ""}
              onChange={(e) => handleChange("header1", e.target.value)}
            />
            {/* Преимущество №2 */}
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Преимущество №2
            </Typography>
            <Input
              crossOrigin={undefined}
              label="Преимущество №2"
              value={content.header2 || ""}
              onChange={(e) => handleChange("header2", e.target.value)}
            />
            {/* Преимущество №3 */}
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Преимущество №3
            </Typography>
            <Input
              crossOrigin={undefined}
              label="Преимущество №3"
              value={content.header3 || ""}
              onChange={(e) => handleChange("header3", e.target.value)}
            />
            {/* Преимущество №4 */}
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Преимущество №4
            </Typography>
            <Input
              crossOrigin={undefined}
              label="Преимущество №4"
              value={content.header4 || ""}
              onChange={(e) => handleChange("header4", e.target.value)}
            />
            {/* Преимущество №5 */}
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Преимущество №5
            </Typography>
            <Input
              crossOrigin={undefined}
              label="Преимущество №5"
              value={content.header5 || ""}
              onChange={(e) => handleChange("header5", e.target.value)}
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

export default AboutUsPage;
