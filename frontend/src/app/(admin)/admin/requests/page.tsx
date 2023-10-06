"use client";

import RequestsList from "@/components/admin/RequestsList";
import { useGetRequestItemsQuery } from "@/redux/features/app_utils/requestSlice";
import { Alert, Spinner } from "@material-tailwind/react";

const RequestsView = () => {
  const {
    data: requestsList,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetRequestItemsQuery();

  let content;
  if (isLoading) {
    content = <Spinner className="ml-40 mt-20 h-16 w-16 text-gray-900/50" />;
  } else if (isError) {
    console.log(error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Произошла ошибка при загрузке данных.";
    content = (
      <Alert className="ml-40 mt-20" color="red">
        {errorMessage}
      </Alert>
    );
  } else if (isSuccess) {
    content = <RequestsList requestsList={requestsList.entities} />;
  }

  return <>{content}</>;
};

export default RequestsView;
