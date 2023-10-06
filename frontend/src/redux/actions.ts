import { toggleSlice } from "./features/app_utils/ToggleSlice";
import { authSlice } from "./features/auth/authSlice";
import { cartSlice } from "./features/cart/cartSlice";

export const rootActions = {
  ...authSlice.actions,
  ...cartSlice.actions,
  ...toggleSlice.actions,
};
