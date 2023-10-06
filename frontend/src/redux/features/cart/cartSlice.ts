import { ICartItem } from "@/interfaces/cart.interface";
import { IProduct } from "@/interfaces/product.interface";
import { RootState } from "@/redux/store";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";

export interface CartState {
  cartItems: ICartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<IProduct>) => {
      const item = state.cartItems.find(
        (el) => el.product.id === action.payload.id,
      );
      if (item) item.qty++;
      else {
        state.cartItems.push({
          product: action.payload,
          qty: 1,
        });
      }
    },

    decrement: (state, action: PayloadAction<IProduct>) => {
      const item = state.cartItems.find(
        (el) => el.product.id === action.payload.id,
      );
      if (item) {
        item.qty--;
        if (item.qty === 0) {
          state.cartItems.filter((el) => el.product.id !== action.payload.id);
        }
      }
    },
  },
});

const cartItems = (state: RootState) => state.cart.cartItems;

export const productQtyInCartSelector = (productId: number) =>
  createSelector(
    [cartItems],
    (cartItems) => cartItems.find((el) => el.product.id === productId)?.qty,
  );

export const totalCartItemsSelector = createSelector([cartItems], (cartItems) =>
  cartItems.reduce((total: number, curr: ICartItem) => (total += curr.qty), 0),
);

export const totalPriceSelector = createSelector([cartItems], (cartItems) =>
  cartItems.reduce(
    (total: number, curr: ICartItem) =>
      (total +=
        curr.qty * (curr.product.sale_price || curr.product.base_price)),
    0,
  ),
);

export const { increment, decrement } = cartSlice.actions;
export default cartSlice.reducer;
