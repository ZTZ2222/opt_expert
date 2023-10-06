import { ISize } from "@/interfaces/product.interface";
import { useDeleteSizeMutation } from "@/redux/features/product/sizeSlice";
import { TrashIcon } from "@heroicons/react/24/solid";
import { IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { Dictionary } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface Props {
  sizesList: Dictionary<ISize>;
}

const SizesList = ({ sizesList }: Props) => {
  const TABLE_HEAD = ["ID Размера", "Наименование", "Удалить"];

  const [
    deleteSize,
    { isSuccess: deleteIsSuccess, isError: deleteIsError, error },
  ] = useDeleteSizeMutation();

  useEffect(() => {
    if (deleteIsSuccess) {
      toast.dismiss();
      toast.success("Размер успешно удален");
    } else if (deleteIsError) {
      toast.dismiss();
      toast.error(`Упс! Произошла ошибка! ${JSON.stringify(error)}`);
    }
  }, [deleteIsSuccess, deleteIsError, error]);

  const listOfSizes = Object.values(sizesList);

  return (
    <table className="mt-4 min-w-max max-w-fit table-auto text-left">
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
        {listOfSizes.map((size, index) => {
          const isLast = index === listOfSizes.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
          if (size)
            return (
              <tr key={size.id} className="">
                {/* ID Размера */}
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="truncate font-normal"
                  >
                    Размер #{size.id}
                  </Typography>
                </td>
                {/* Наименование */}
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal opacity-70"
                  >
                    {size.name}
                  </Typography>
                </td>
                {/* Действие */}
                <td className={classes}>
                  <Tooltip content="Удалить размер">
                    <IconButton
                      variant="text"
                      size="sm"
                      onClick={() => deleteSize(size.id)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            );
        })}
      </tbody>
    </table>
  );
};

export default SizesList;
