import { ISubcategory } from "@/interfaces/category.interface";
import { apiSlice } from "@/redux/api/apiSlice";
import { EntityState, createEntityAdapter } from "@reduxjs/toolkit";

const subcategoriesAdapter = createEntityAdapter<ISubcategory>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = subcategoriesAdapter.getInitialState();

export const subcategoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubcategories: builder.query<EntityState<ISubcategory>, void>({
      query: () => "/sub",
      transformResponse: (response: ISubcategory[]) => {
        return subcategoriesAdapter.addMany(initialState, response);
      },
      providesTags: ["Subcategories"],
    }),
    createSubcategory: builder.mutation<ISubcategory, Partial<ISubcategory>>({
      query: (subcategory) => ({
        url: "/sub/create",
        method: "POST",
        credentials: "include",
        body: subcategory,
      }),
      invalidatesTags: ["Subcategories"],
    }),
    updateSubcategory: builder.mutation<ISubcategory, ISubcategory>({
      query: (subcategory) => ({
        url: `/sub/update`,
        method: "PUT",
        credentials: "include",
        body: subcategory,
      }),
      invalidatesTags: ["Subcategories"],
    }),
    deleteSubcategory: builder.mutation<void, number>({
      query: (subcategoryId) => ({
        url: `/sub/delete`,
        method: "DELETE",
        credentials: "include",
        body: { id: subcategoryId },
      }),
      invalidatesTags: ["Subcategories"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSubcategoriesQuery,
  useCreateSubcategoryMutation,
  useUpdateSubcategoryMutation,
  useDeleteSubcategoryMutation,
} = subcategoriesApi;
