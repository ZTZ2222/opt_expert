"use client";

import CatalogItem from "@/components/CatalogItem";
import { useGetCategoriesQuery } from "@/redux/features/category/categoriesSlice";
import { Alert, Spinner } from "@material-tailwind/react";

const Catalogs = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetCategoriesQuery();

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
  } else if (isSuccess && data) {
    content = (
      <ul className="container mx-auto grid grid-cols-2 gap-x-6 gap-y-8 px-3 md:grid-cols-3 md:px-0 xl:grid-cols-4">
        {Object.values(data?.entities).map((item) => (
          <li key={item!.id}>
            <CatalogItem
              id={item!.id}
              name={item!.name}
              slug_en={item!.slug_en}
              image={item!.image}
            />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <main className="mb-12">
      <h1 className="mb-12 text-center text-4xl font-bold uppercase">
        Каталоги
      </h1>
      {content}
    </main>
  );
};

export default Catalogs;
