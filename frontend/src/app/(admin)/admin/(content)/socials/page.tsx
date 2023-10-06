"use client";

import { IContent } from "@/interfaces/content.interface";
import {
  useGetContentsQuery,
  useUpdateContentMutation,
} from "@/redux/features/app_utils/contentSlice";
import {
  Alert,
  Button,
  Card,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { Dictionary, EntityId } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";

const SocialButtonSettings = () => {
  const TABLE_HEAD = ["ID", "Соц. сеть", "Ссылка", ""];

  const { data, isLoading, isError, isSuccess, error } = useGetContentsQuery();

  const [socials, setSocials] = useState<Dictionary<IContent>>({});

  useEffect(() => {
    setSocials(data?.entities!);
  }, [data]);

  const [updateContent] = useUpdateContentMutation();

  const handleChange = (id: EntityId, value: IContent) => {
    setSocials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleUpdateClick = (id: EntityId, title: string) => {
    const description = socials[id]?.description!;
    updateContent({ id: Number(id), title: title, description: description });
  };

  if (isLoading) {
    return <Spinner className="ml-40 mt-20 h-16 w-16 text-gray-900/50" />;
  } else if (isError) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Произошла ошибка при загрузке данных.";
    return (
      <Alert className="ml-40 mt-20" color="red">
        {errorMessage}
      </Alert>
    );
  } else if (isSuccess && data && socials) {
    return (
      <>
        <Typography variant="h2" className="px-20 py-5">
          Настройки меню навигации
        </Typography>
        <Card className="h-full w-2/4 min-w-max overflow-scroll">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.ids.map((id, index) => {
                const isLast = index === data.ids.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {id}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {data.entities[id]?.title}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Input
                        crossOrigin={undefined}
                        onChange={(e) =>
                          handleChange(id, {
                            title: data.entities[id]?.title!,
                            description: e.target.value,
                            id: Number(id),
                          })
                        }
                        value={socials[id]?.description || ""}
                        label="Ссылка"
                      />
                    </td>
                    <td className={classes}>
                      <Button
                        variant="outlined"
                        color="blue-gray"
                        className="place-self-center"
                        onClick={() =>
                          handleUpdateClick(id, data.entities[id]?.title!)
                        }
                      >
                        Изменить
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </>
    );
  }
};

export default SocialButtonSettings;
