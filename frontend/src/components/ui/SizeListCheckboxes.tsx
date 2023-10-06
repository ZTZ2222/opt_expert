"use client";

import { IProductCreate, IProductUpdate } from "@/interfaces/product.interface";
import { useGetSizesQuery } from "@/redux/features/product/sizeSlice";
import {
  Alert,
  Card,
  Checkbox,
  List,
  ListItem,
  Spinner,
} from "@material-tailwind/react";
import { EntityId } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";

interface Props {
  product: IProductUpdate | IProductCreate;
  setProduct: React.Dispatch<
    React.SetStateAction<IProductUpdate | IProductCreate>
  >;
}

export function SizeListCheckBoxes({ product, setProduct }: Props) {
  const { data, isLoading, isSuccess, isError, error } = useGetSizesQuery();

  const [allSizesIds, setAllSizesIds] = useState<EntityId[]>([]);

  const handleSizeChange = (size: string) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      sizes: prevProduct.sizes
        ? prevProduct.sizes.includes(size)
          ? prevProduct.sizes.filter((s) => s !== size)
          : [...prevProduct.sizes, size]
        : [size],
    }));
  };

  useEffect(() => {
    if (isSuccess && data) {
      setAllSizesIds(data.ids);
    }
  }, [isSuccess]);

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

  return (
    <Card className="w-full max-w-[24rem]">
      <List className="grid grid-cols-2 xl:grid-cols-4">
        {allSizesIds.map((id) => (
          <ListItem key={id} className="m-0 p-0">
            <Checkbox
              crossOrigin={undefined}
              ripple={false}
              className="hover:before:opacity-0"
              label={data?.entities[id]?.name.toUpperCase() || "Размер"}
              onChange={() => handleSizeChange(data?.entities[id]?.name!)}
              checked={
                product.sizes
                  ? product.sizes.includes(data?.entities[id]?.name!)
                  : false
              }
            />
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
