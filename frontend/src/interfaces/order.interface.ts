import { IBase } from "./base.interface";
import { IProduct } from "./product.interface";

export interface IOrder extends IBase {
  full_name: string;
  telephone: string;
  status: "Оформлен" | "Оплачен" | "В пути" | "Доставлен" | "Возврат";
  items: IOrderItem[];
}

export interface IOrderItem extends Omit<IBase, "id"> {
  id?: number;
  order_id?: number;
  product_id: number;
  quantity: number;

  order?: IOrder;
  product?: IProduct;
}
