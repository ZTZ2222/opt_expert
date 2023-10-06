import { IOrder } from "@/interfaces/order.interface";
import { apiSlice } from "@/redux/api/apiSlice";
import { EntityState, createEntityAdapter } from "@reduxjs/toolkit";

const ordersAdapter = createEntityAdapter<IOrder>({
  sortComparer: (a, b) => a.created_at!.localeCompare(b.created_at!),
});

const initialState = ordersAdapter.getInitialState();

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<EntityState<IOrder>, void>({
      query: () => "/orders",
      transformResponse: (response: IOrder[]) => {
        return ordersAdapter.addMany(initialState, response);
      },
      providesTags: ["Orders"],
    }),
    createOrder: builder.mutation<IOrder, Partial<IOrder>>({
      query: (order) => ({
        url: "/orders/create",
        method: "POST",
        credentials: "include",
        body: order,
      }),
      invalidatesTags: ["Orders"],
    }),
    updateOrder: builder.mutation<IOrder, IOrder>({
      query: (order) => ({
        url: `/orders/update`,
        method: "PUT",
        credentials: "include",
        body: order,
      }),
      invalidatesTags: ["Orders"],
    }),
    deleteOrder: builder.mutation<void, number>({
      query: (orderId) => ({
        url: `/orders/delete/${orderId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = ordersApi;
