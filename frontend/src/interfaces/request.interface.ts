import { IBase } from "./base.interface";

export interface IRequestItemCreate {
  name: string;
  telephone: string;
  text: string;
}

export interface IRequestItem extends IBase {
  name: string;
  telephone: string;
  text: string;
}
