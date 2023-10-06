"use client";

import ProductsList from "@/components/admin/ProductsList";
import { useGetProductsQuery } from "@/redux/features/product/productsSlice";
import { Alert, Spinner } from "@material-tailwind/react";

const ProductsPage = () => {
  const {
    data: productsList,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetProductsQuery({});

  if (isLoading) {
    return <Spinner className="ml-40 mt-20 h-16 w-16 text-gray-900/50" />;
  } else if (isError) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Произошла ошибка при загрузке данных.";
    return (
      <Alert className="ml-40 mt-20" color="red">
        {errorMessage}
      </Alert>
    );
  }

  return <ProductsList productsList={productsList?.entities!} />;
};

export default ProductsPage;
