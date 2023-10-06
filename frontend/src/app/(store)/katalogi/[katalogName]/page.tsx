"use client";

import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/Button";
import { useGetRouteMappingsQuery } from "@/redux/features/app_utils/routeMappingSlice";
import { useGetCategoriesQuery } from "@/redux/features/category/categoriesSlice";
import { useGetCategoryProductsQuery } from "@/redux/features/product/productsSlice";
import { Alert, Spinner } from "@material-tailwind/react";
import Link from "next/link";

const CategoryProducts = ({ params }: { params: { katalogName: string } }) => {
  const { data } = useGetCategoriesQuery();

  const { data: RouteMappings } = useGetRouteMappingsQuery();

  const {
    data: productsList,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetCategoryProductsQuery(params.katalogName);

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
    content =
      Object.values(productsList?.entities).length === 0
        ? "Нет товаров"
        : Object.values(productsList?.entities).map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ));
  }

  return (
    <main className="mb-14 flex flex-col md:mx-4 lg:mx-7">
      <div className="mb-10 flex flex-col justify-center text-darkBlue md:flex-row md:justify-between md:gap-3">
        <nav className="w-full md:w-1/5">
          <h1 className="mb-8 text-center text-3xl font-bold uppercase md:text-start xl:text-4xl">
            {RouteMappings
              ? RouteMappings.entities[params.katalogName.toLowerCase()]?.name
              : params.katalogName}
          </h1>
          <div className="hidden md:block">
            <h2 className="mb-3 cursor-pointer text-xl lg:text-2xl">
              Категории
            </h2>
            <div className="flex flex-col gap-2">
              {data &&
                Object.values(data?.entities!).map((item) => (
                  <Link
                    key={item?.id}
                    href={`${item?.slug_en}`}
                    className="transition-all hover:text-teal-300"
                  >
                    {item?.name}
                  </Link>
                ))}
            </div>
          </div>
        </nav>
        <div className="flex w-full flex-wrap items-start justify-center gap-3 md:w-4/5 md:items-center md:justify-evenly md:gap-4 xl:justify-start">
          {content}
        </div>
      </div>
      <Button variant="primary" square className="h-12 w-60 self-center">
        Загрузить еще
      </Button>
    </main>
  );
};

export default CategoryProducts;
