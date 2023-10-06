import { ISize } from "@/interfaces/product.interface";
import { apiSlice } from "@/redux/api/apiSlice";
import { EntityState, createEntityAdapter } from "@reduxjs/toolkit";

const sizesAdapter = createEntityAdapter<ISize>();

const initialState = sizesAdapter.getInitialState();

export const sizesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSizes: builder.query<EntityState<ISize>, void>({
      query: () => "/size",
      transformResponse: (response: ISize[]) => {
        return sizesAdapter.addMany(initialState, response);
      },
      providesTags: ["Sizes"],
    }),
    createSize: builder.mutation<ISize, Partial<ISize>>({
      query: (size) => ({
        url: "/size/create",
        method: "POST",
        credentials: "include",
        body: size,
      }),
      invalidatesTags: ["Sizes"],
    }),
    deleteSize: builder.mutation<void, number>({
      query: (sizeId) => ({
        url: `/size/delete/${sizeId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Sizes"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSizesQuery,
  useCreateSizeMutation,
  useDeleteSizeMutation,
} = sizesApi;
