"use client";

import SubcategoriesList from "@/components/admin/SubcategoriesList";
import { useGetSubcategoriesQuery } from "@/redux/features/category/subcategoriesSlice";
import { Alert, Spinner } from "@material-tailwind/react";

const SubsList = () => {
  const {
    data: subcategoriesList,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetSubcategoriesQuery();

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
    content = (
      <SubcategoriesList subcategoriesList={subcategoriesList.entities} />
    );
  }

  return <>{content}</>;
};

export default SubsList;
