"use client";

import SizesList from "@/components/admin/SizesList";
import { useGetSizesQuery } from "@/redux/features/product/sizeSlice";
import { Alert, Spinner } from "@material-tailwind/react";

const SizesPage = () => {
  const {
    data: sizesList,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetSizesQuery();

  let content;
  if (isLoading) {
    content = <Spinner className="ml-40 mt-20 h-16 w-16 text-gray-900/50" />;
  } else if (isError) {
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
    content = <SizesList sizesList={sizesList.entities} />;
  }

  return <>{content}</>;
};

export default SizesPage;
