import { IRequestItem } from "@/interfaces/request.interface";
import { apiSlice } from "@/redux/api/apiSlice";
import { EntityState, createEntityAdapter } from "@reduxjs/toolkit";

const requestItemsAdapter = createEntityAdapter<IRequestItem>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = requestItemsAdapter.getInitialState();

export const requestItemsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRequestItems: builder.query<EntityState<IRequestItem>, void>({
      query: () => "/request",
      transformResponse: (response: IRequestItem[]) => {
        return requestItemsAdapter.addMany(initialState, response);
      },
      providesTags: ["Requests"],
    }),
    createRequestItem: builder.mutation<IRequestItem, Partial<IRequestItem>>({
      query: (requestItem) => ({
        url: "/request/create",
        method: "POST",
        credentials: "include",
        body: requestItem,
      }),
      invalidatesTags: ["Requests"],
    }),
    deleteRequestItem: builder.mutation<void, number>({
      query: (requestItemId) => ({
        url: `/request/delete/${requestItemId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Requests"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRequestItemsQuery,
  useCreateRequestItemMutation,
  useDeleteRequestItemMutation,
} = requestItemsApi;
