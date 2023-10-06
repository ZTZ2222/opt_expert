import {
  IGetProductsQueryParams,
  IProduct,
} from "@/interfaces/product.interface";
import { apiSlice } from "@/redux/api/apiSlice";
import { EntityState, createEntityAdapter } from "@reduxjs/toolkit";

export const productsAdapter = createEntityAdapter<IProduct>({
  sortComparer: (a, b) => b.created_at!.localeCompare(a.created_at!),
  selectId: (product) => product.slug_en!,
});

export const initialState = productsAdapter.getInitialState();

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<EntityState<IProduct>, IGetProductsQueryParams>({
      query: ({ offset, limit, search }) => {
        const queryParams = new URLSearchParams();

        if (offset) {
          queryParams.append("offset", offset.toString());
        }
        if (limit) {
          queryParams.append("limit", limit.toString());
        }
        if (search) {
          queryParams.append("search", search);
        }

        return `/products?${queryParams.toString()}`;
      },
      transformResponse: (response: IProduct[]) => {
        return productsAdapter.addMany(initialState, response);
      },
      providesTags: ["Products"],
    }),
    getCategoryProducts: builder.query<EntityState<IProduct>, string>({
      query: (category_slug) =>
        category_slug ? `/categories/${category_slug}` : "/categories",
      transformResponse: (response: IProduct[]) => {
        return productsAdapter.addMany(initialState, response);
      },
      providesTags: ["Products"],
    }),
    createProduct: builder.mutation<IProduct, Partial<IProduct>>({
      query: (newProduct) => ({
        url: "/products/create",
        method: "POST",
        credentials: "include",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation<IProduct, Partial<IProduct>>({
      query: (product) => ({
        url: "/products/update",
        method: "PUT",
        credentials: "include",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `/products/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useGetCategoryProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
