import { IBase } from "./base.interface";

export interface IUser extends IBase {
  email: string;
  is_staff: boolean;
  is_superuser: boolean;
}
