"use client";

import CategoriesList from "@/components/admin/CategoriesList";
import { useGetCategoriesQuery } from "@/redux/features/category/categoriesSlice";
import { Alert, Spinner } from "@material-tailwind/react";

const CategoriesPage = () => {
  const {
    data: categoriesList,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetCategoriesQuery();

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
    content = <CategoriesList categoriesList={categoriesList.entities} />;
  }

  return <>{content}</>;
};

export default CategoriesPage;
