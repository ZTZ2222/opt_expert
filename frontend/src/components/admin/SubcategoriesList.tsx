import { ISubcategory } from "@/interfaces/category.interface";
import { useDeleteSubcategoryMutation } from "@/redux/features/category/subcategoriesSlice";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { Dictionary } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface Props {
  subcategoriesList: Dictionary<ISubcategory>;
}

const SubcategoriesList = ({ subcategoriesList }: Props) => {
  const { push } = useRouter();

  const TABLE_HEAD = ["Название", "Добавлен", "Действие"];

  const [
    deleteSubcategory,
    { isSuccess: deleteIsSuccess, isError: deleteIsError },
  ] = useDeleteSubcategoryMutation();

  useEffect(() => {
    if (deleteIsSuccess) {
      toast.dismiss();
      toast.success("Подкатегория успешно удалена");
    } else if (deleteIsError) {
      toast.dismiss();
      toast.error("Упс! Произошла ошибка!");
    }
  }, [deleteIsSuccess, deleteIsError]);

  const listOfCategories = Object.values(subcategoriesList);
  return (
    <table className="mt-4 w-3/4 min-w-max table-auto text-left">
      <thead>
        <tr>
          {TABLE_HEAD.map((head) => (
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
        {listOfCategories.map((subcategory, index) => {
          const isLast = index === listOfCategories.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
          if (subcategory)
            return (
              <tr key={subcategory.name} className="">
                {/* Название/Артикул */}
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="truncate font-normal"
                    >
                      {subcategory.name}
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
                    {new Date(subcategory.created_at!).toLocaleString("ru-RU", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </Typography>
                </td>
                {/* Действие */}
                <td className={classes}>
                  <div className="flex gap-0">
                    <Tooltip content="Изменить подкатегорию">
                      <IconButton
                        variant="text"
                        size="sm"
                        onClick={() => push(`/admin/subs/${subcategory.id}`)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Удалить подкатегорию">
                      <IconButton
                        variant="text"
                        size="sm"
                        onClick={() => deleteSubcategory(subcategory.id!)}
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

export default SubcategoriesList;
