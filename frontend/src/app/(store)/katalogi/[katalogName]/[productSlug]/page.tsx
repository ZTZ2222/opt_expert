"use client";

import AddToCart from "@/components/ui/AddToCart";
import { countryDict } from "@/dict";
import { IProduct } from "@/interfaces/product.interface";
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";
import { use } from "react";

const getProduct = async (productSlug: string): Promise<IProduct> => {
  const res = await fetch(`${process.env.API_URL}/products/${productSlug}`);
  if (!res.ok) {
    throw new Error("failed to fetch");
  }

  const data = await res.json();
  return data;
};

const ProductPage = ({ params }: { params: { productSlug: string } }) => {
  const product = use(getProduct(params.productSlug));

  return (
    <main className="mx-5 text-darkBlue lg:mx-8 xl:mx-24">
      <section className="relative flex flex-col justify-evenly gap-2 md:flex-row lg:gap-10">
        <Carousel
          autoplay={true}
          loop={true}
          autoplayDelay={3000}
          transition={{ duration: 0.8 }}
          className="mb-4 mt-20 h-[380px] w-[288px] shrink-0 self-center overflow-hidden md:mb-24 md:mt-0 md:h-[555px] md:w-[360px] lg:h-[655px] lg:w-[420px] xl:h-[924px] xl:w-[600px]"
          prevArrow={() => ""}
          nextArrow={() => ""}
          navigation={({ setActiveIndex, activeIndex }) => (
            <div className="absolute bottom-1 left-2/4 z-40 flex -translate-x-2/4 gap-2">
              {product.images.map((image, i) => (
                <span
                  key={i}
                  className={`relative h-2 w-2 shrink-0 cursor-pointer rounded-[10px] bg-gray-500 transition-all content-[''] md:h-16 md:w-12 lg:h-20 lg:w-16 xl:h-32 xl:w-24 ${
                    activeIndex === i
                      ? "w-5 bg-gradient-to-r from-bgButton1 to-bgButton2 outline-purple-600 md:outline md:outline-2 lg:outline-[3px]"
                      : ""
                  }`}
                  onClick={() => setActiveIndex(i)}
                >
                  <Image
                    alt={product.name}
                    src={image}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="hidden rounded-[10px] object-cover md:block "
                  />
                </span>
              ))}
            </div>
          )}
        >
          {product.images.map((image, idx) => (
            <div
              key={idx}
              className="relative h-[350px] w-[288px] md:h-[460px] md:w-[360px] lg:h-[545px] lg:w-[420px] xl:h-[766px] xl:w-[600px]"
            >
              <Image
                alt={product.name}
                src={image}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-md object-cover"
              />
            </div>
          ))}
        </Carousel>
        <div className="flex flex-col md:w-5/12 lg:w-auto">
          <h1 className="absolute left-2/4 top-0 mb-5 line-clamp-2 w-72 -translate-x-2/4 text-3xl font-bold uppercase md:static md:order-1 md:w-auto md:-translate-x-0 lg:mb-4 xl:text-4xl">
            {product.name}
          </h1>
          <span className="order-4 mb-4 font-sans text-gray-500 md:order-2 md:mb-6 lg:text-sm xl:text-base">
            Артикул: {product.article}
          </span>
          <div className="order-2 mb-5 flex flex-col items-center gap-5 md:order-3 md:items-start md:gap-6 lg:mb-5">
            <span className="text-3xl font-bold xl:text-4xl">
              Цена:{" "}
              {product.sale_price ? product.sale_price : product.base_price} сом
            </span>
            <AddToCart product={product} className="w-52 font-bold" />
          </div>
          <div className="order-3 flex flex-col md:order-4">
            <span className="mb-4 font-medium lg:text-base xl:text-lg">
              Описание
            </span>
            <p className="mb-8 lg:mb-12 lg:text-sm xl:text-[15px]">
              {product.description}
            </p>
          </div>
          <div className="order-5 flex flex-col md:order-5">
            <span className="mb-4 font-medium lg:mb-6 lg:text-base xl:text-lg">
              Дополнительная информация
            </span>
            <div className="mb-3 flex lg:mb-5">
              <span className="font-medium text-gray-600 lg:text-sm xl:text-base">
                Вес (г):
              </span>
              <hr className="mx-1 h-[2px] self-end bg-gray-600 lg:mx-3 lg:w-[150px] xl:w-52" />
              <span className="font-medium text-bgGradient2 lg:text-sm xl:text-base">
                {product.weight} г
              </span>
            </div>
            <div className="mb-8 flex lg:mb-12">
              <span className="font-medium text-gray-600 lg:text-sm xl:text-base">
                Страна производства:
              </span>
              <hr className="mx-1 h-[2px] self-end bg-gray-600 lg:mx-3 lg:w-12 xl:w-24" />
              <span className="font-medium text-bgGradient2 lg:text-sm xl:text-base">
                {countryDict[product.product_origin.toLowerCase()]}
              </span>
            </div>
          </div>
          <div className="order-1 flex flex-col items-center md:order-6 md:items-start">
            <span className="mb-4 font-medium md:order-11 lg:mb-6 lg:text-base xl:text-lg">
              Доступные размеры
            </span>
            <div className="mb-8 flex flex-wrap gap-5 md:order-12">
              {product.sizes.map((size, index) => (
                <span
                  key={index}
                  className={`h-9 w-12 cursor-default rounded-md bg-gradient-to-r from-bgButton2 to-bgButton1 p-[1px] xl:h-12 xl:w-16`}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-md bg-white text-sm font-bold xl:text-base">
                    {size}
                  </div>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductPage;
