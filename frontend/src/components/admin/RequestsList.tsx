import { IRequestItem } from "@/interfaces/request.interface";
import { useDeleteRequestItemMutation } from "@/redux/features/app_utils/requestSlice";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/solid";
import { IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { Dictionary } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface Props {
  requestsList: Dictionary<IRequestItem>;
}

const RequestsList = ({ requestsList }: Props) => {
  const { push } = useRouter();

  const TABLE_HEAD = [
    "ID Заявки",
    "Имя клиента",
    "Телефон",
    "Заявка",
    "Создан",
    "Действие",
  ];

  const [
    deleteRequest,
    { isSuccess: deleteIsSuccess, isError: deleteIsError, error },
  ] = useDeleteRequestItemMutation();

  useEffect(() => {
    if (deleteIsSuccess) {
      toast.dismiss();
      toast.success("Заявка успешно удалена");
    } else if (deleteIsError) {
      toast.dismiss();
      toast.error(`Упс! Произошла ошибка! ${JSON.stringify(error)}`);
    }
  }, [deleteIsSuccess, deleteIsError]);

  const listOfRequests = Object.values(requestsList);

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
        {listOfRequests.map((request, index) => {
          const isLast = index === listOfRequests.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
          if (request)
            return (
              <tr key={request.id} className="">
                {/* ID Заявки */}
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="truncate font-normal"
                  >
                    Заявка #{request.id}
                  </Typography>
                </td>
                {/* Имя Клиента */}
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal opacity-70"
                  >
                    {request.name}
                  </Typography>
                </td>
                {/* Телефон */}
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal opacity-70"
                  >
                    {request.telephone}
                  </Typography>
                </td>
                {/* Заявка */}
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="line-clamp-1 flex h-20 w-60 items-center font-normal opacity-70"
                  >
                    {request.text}
                  </Typography>
                </td>
                {/* Дата добавления */}
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal opacity-70"
                  >
                    {new Date(request.created_at!).toLocaleString("ru-RU", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </Typography>
                </td>
                {/* Действие */}
                <td className={classes}>
                  <div className="flex gap-0">
                    <Tooltip content="Посмотреть заказ">
                      <IconButton
                        variant="text"
                        size="sm"
                        onClick={() => push(`/admin/requests/${request.id}`)}
                      >
                        <EyeIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Удалить заказ">
                      <IconButton
                        variant="text"
                        size="sm"
                        onClick={() => deleteRequest(request.id)}
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

export default RequestsList;
