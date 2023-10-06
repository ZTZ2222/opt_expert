"use client";

import { IRequestItem } from "@/interfaces/request.interface";
import { useGetRequestItemsQuery } from "@/redux/features/app_utils/requestSlice";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  params: { requestId: string };
};

const UpdateRequestPage = ({ params }: Props) => {
  const router = useRouter();

  const { request: requestById } = useGetRequestItemsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      request: data?.entities[Number(params.requestId)],
    }),
  });

  const [request, setRequest] = useState<IRequestItem>({} as IRequestItem);

  useEffect(() => {
    if (requestById) {
      setRequest(requestById);
    }
  }, [requestById]);

  return (
    <Card className="inline-flex w-auto flex-col">
      <CardHeader className="m-6 flex flex-col gap-3" shadow={false}>
        {/* Имя клиента */}
        <Typography variant="h4" color="black" className="font-bold leading-7">
          Имя клиента
        </Typography>
        <div className="rounded-lg border border-gray-500 px-2 py-1">
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="m-1 font-normal opacity-70"
          >
            {request.name || ""}
          </Typography>
        </div>
        {/* Телефон */}
        <Typography variant="h4" color="black" className="font-bold leading-7">
          Телефон
        </Typography>
        <div className="rounded-lg border border-gray-500 px-2 py-1">
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="m-1 font-normal opacity-70"
          >
            {request.telephone || ""}
          </Typography>
        </div>
        {/* Заявка */}
        <Typography variant="h4" color="black" className="font-bold leading-7">
          Заявка
        </Typography>
        <div className="rounded-lg border border-gray-500 px-2 py-1 xl:w-[800px]">
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="m-1 font-normal opacity-70"
          >
            {request.text || ""}
          </Typography>
        </div>
      </CardHeader>
      <CardFooter>
        {/* Save & Cancel Buttons */}
        <div className="mt-12 flex flex-col items-center justify-center">
          <Typography variant="h6">Желаете ли связаться с клиентом?</Typography>
          <div className="mt-5 flex items-center justify-center gap-10">
            <Button
              type="submit"
              disabled
              color="green"
              className="h-10 w-32 capitalize"
            >
              Связаться
            </Button>
            <Button
              onClick={() => {
                router.push("/admin/requests");
              }}
              className="h-10 w-32 capitalize"
            >
              Назад
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UpdateRequestPage;
