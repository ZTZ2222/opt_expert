"use client";

import OrdersList from "@/components/admin/OrdersList";
import { useGetOrdersQuery } from "@/redux/features/order/ordersSlice";
import { Alert, Spinner } from "@material-tailwind/react";

const OrdersPage = () => {
  const {
    data: ordersList,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetOrdersQuery();

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
    content = <OrdersList ordersList={ordersList.entities} />;
  }

  return <>{content}</>;
};

export default OrdersPage;
