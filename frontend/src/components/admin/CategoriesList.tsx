import { ICategory } from "@/interfaces/category.interface";
import { useDeleteCategoryMutation } from "@/redux/features/category/categoriesSlice";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { Dictionary } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface Props {
  categoriesList: Dictionary<ICategory>;
}

const CategoriesList = ({ categoriesList }: Props) => {
  const { push } = useRouter();

  const TABLE_HEAD = ["Название", "Ссылка", "Добавлен", "Действие"];

  const [
    deleteCategory,
    { isSuccess: deleteIsSuccess, isError: deleteIsError },
  ] = useDeleteCategoryMutation();

  useEffect(() => {
    if (deleteIsSuccess) {
      toast.dismiss();
      toast.success("Категория успешно удалена");
    } else if (deleteIsError) {
      toast.dismiss();
      toast.error("Упс! Произошла ошибка!");
    }
  }, [deleteIsSuccess, deleteIsError]);

  const listOfCategories = Object.values(categoriesList);
  return (
    <table className="mt-4 w-3/4 min-w-max table-auto text-left">
      <thead>
        <tr>
          {TABLE_HEAD.map((head, index) => (
            <th
              key={head}
              className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
              >
                {head}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {listOfCategories.map((category, index) => {
          const isLast = index === listOfCategories.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
          if (category)
            return (
              <tr key={category.name} className="">
                {/* Название/Артикул */}
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <Avatar
                      variant="rounded"
                      src={
                        category.image
                          ? category.image
                          : "/Products/placeholder-image.png"
                      }
                      alt={category.name}
                      size="lg"
                    />
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="truncate font-normal"
                    >
                      {category.name}
                    </Typography>
                  </div>
                </td>
                {/* Дата добавления */}
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal opacity-70"
                  >
                    {new Date(category.created_at!).toLocaleString("ru-RU", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </Typography>
                </td>
                {/* Действие */}
                <td className={classes}>
                  <div className="flex gap-0">
                    <Tooltip content="Изменить категорию">
                      <IconButton
                        variant="text"
                        size="sm"
                        onClick={() =>
                          push(`/admin/categories/${category.slug_en}`)
                        }
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Удалить категорию">
                      <IconButton
                        variant="text"
                        size="sm"
                        onClick={() => deleteCategory(category.id!)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            );
        })}
      </tbody>
    </table>
  );
};

export default CategoriesList;
