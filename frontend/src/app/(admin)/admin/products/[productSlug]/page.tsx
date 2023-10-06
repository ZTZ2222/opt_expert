"use client";

import ProductUpdateForm from "@/components/admin/ProductUpdateForm";

type Props = {
  params: { productSlug: string };
};

const ProductEdit = ({ params }: Props) => {
  return (
    <>
      <ProductUpdateForm productSlug={params.productSlug} />
    </>
  );
};

export default ProductEdit;
