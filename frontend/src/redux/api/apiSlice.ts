import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://opt-expert.fibo.cloud/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.access_token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Products",
    "Categories",
    "Subcategories",
    "Auth",
    "Orders",
    "Requests",
    "Sizes",
    "Contents",
    "PageContents",
    "RouteMappings",
  ],

  endpoints: () => ({}),
});
