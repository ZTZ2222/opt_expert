import { IBase } from "./base.interface";
import { ICategory, ISubcategory } from "./category.interface";

export interface IProductCreate extends Omit<IBase, "id"> {
  name: string;
  article: string;
  base_price: number;
  sale_price?: number;
  description: string;
  images: string[];
  weight: number;
  product_origin: string;
  status: "Активный" | "Скрытый";
  category_id: number;
  sub_id: number;
  sizes: string[];
  slug_en?: string;
}

export interface IProductUpdate extends IProductCreate {
  id: number;
}

export interface IProduct extends IProductUpdate {
  category: ICategory;
  sub: ISubcategory;
}

export interface IGetProductsQueryParams {
  offset?: number;
  limit?: number;
  search?: string;
}

export interface ISizeCreate {
  name: string;
}

export interface ISize extends IBase {
  name: string;
}
