import { IBase } from "./base.interface";

export interface ICategoryCreate {
  name: string;
  slug_en?: string;
  image: string;
}

export interface ICategory extends IBase {
  name: string;
  slug_en?: string;
  image: string;
}

export interface ISubcategoryCreate {
  name: string;
}

export interface ISubcategory extends IBase {
  name: string;
}
