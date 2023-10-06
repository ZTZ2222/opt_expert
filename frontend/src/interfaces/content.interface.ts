import { IBase } from "./base.interface";

export interface IContent extends IBase {
  title: string;
  description: string;
}

export interface IPageContent extends IBase {
  title: string;
  paragraph1?: string;
  paragraph2?: string;
  paragraph3?: string;
  header1?: string;
  body1?: string;
  header2?: string;
  body2?: string;
  header3?: string;
  body3?: string;
  header4?: string;
  body4?: string;
  header5?: string;
  body5?: string;
  header6?: string;
  body6?: string;
  header7?: string;
  body7?: string;
  backgroundImage?: string;
}

export interface IRouteMapping extends IBase {
  slug_en: string;
  name: string;
}
