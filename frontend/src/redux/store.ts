import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { apiSlice } from "./api/apiSlice";
import { toggleSlice } from "./features/app_utils/ToggleSlice";
import { authSlice } from "./features/auth/authSlice";
import { cartSlice } from "./features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    toggle: toggleSlice.reducer,
    auth: authSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

setupListeners(store.dispatch);
