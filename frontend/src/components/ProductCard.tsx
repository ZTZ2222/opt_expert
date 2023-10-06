import { IProduct } from "@/interfaces/product.interface";
import { Spinner } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: IProduct | undefined;
}

const ProductCard = ({ product }: Props) => {
  if (product === undefined) {
    return <Spinner className="ml-40 mt-20 h-16 w-16 text-gray-900/50" />;
  }
  return (
    <Link
      href={`/katalogi/${product.category.slug_en}/${product.slug_en}`}
      className="flex w-[130px] flex-col sm:w-[150px] md:w-44 lg:w-56 xl:w-[250px]"
    >
      <div className="group relative h-40 overflow-hidden rounded-lg border border-bgGradient2 sm:h-48 md:h-56 lg:h-72 xl:h-[328px]">
        {product.sale_price && (
          <div className="absolute right-2 top-2 z-40 flex h-[35px] w-[35px] items-center justify-center rounded-full bg-red-700 text-xs font-bold uppercase tracking-wider text-white md:h-[40px] md:w-[40px] md:text-sm xl:h-[50px] xl:w-[50px] xl:text-lg">
            -{Math.floor((product.sale_price / product.base_price) * 100)}%
          </div>
        )}
        <div className="absolute left-0 top-0 z-10 h-full w-full rounded-lg bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-30" />
        <Image
          alt={product.name}
          src={product.images[0]}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-lg object-cover transition-all duration-300 group-hover:rotate-12 group-hover:scale-125"
        />
      </div>
      <div className="my-2 w-full">
        <h3 className="mb-1 line-clamp-2 text-[14px] font-medium lg:text-xl xl:text-2xl">
          {product.name}
        </h3>
        <h4 className="text-xs text-gray-600 lg:text-sm xl:text-base">
          Артикул: {product.article}
        </h4>
      </div>
      {product.sale_price ? (
        <div className="flex items-center gap-4">
          <span className="text-base font-bold text-bgGradient2 lg:text-xl xl:text-2xl">
            {product.sale_price} сом
          </span>
          <span className="text-gray-600 line-through">
            {product.base_price} сом
          </span>
        </div>
      ) : (
        <span className="text-base font-bold text-bgGradient2 lg:text-xl xl:text-2xl">
          {product.base_price} сом
        </span>
      )}
    </Link>
  );
};

export default ProductCard;
