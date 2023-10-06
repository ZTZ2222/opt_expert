import { ICategory } from "@/interfaces/category.interface";
import { apiSlice } from "@/redux/api/apiSlice";
import { EntityState, createEntityAdapter } from "@reduxjs/toolkit";

const categoriesAdapter = createEntityAdapter<ICategory>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
  selectId: (category) => category.slug_en!,
});

const initialState = categoriesAdapter.getInitialState();

export const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<EntityState<ICategory>, void>({
      query: () => "/categories",
      transformResponse: (response: ICategory[]) => {
        return categoriesAdapter.addMany(initialState, response);
      },
      providesTags: ["Categories"],
    }),
    createCategory: builder.mutation<ICategory, Partial<ICategory>>({
      query: (category) => ({
        url: "/categories/create",
        method: "POST",
        credentials: "include",
        body: category,
      }),
      invalidatesTags: ["Categories", "RouteMappings"],
    }),
    updateCategory: builder.mutation<ICategory, ICategory>({
      query: (category) => ({
        url: `/categories/update`,
        method: "PUT",
        credentials: "include",
        body: category,
      }),
      invalidatesTags: ["Categories", "RouteMappings"],
    }),
    deleteCategory: builder.mutation<void, number>({
      query: (categoryId) => ({
        url: `/categories/delete/${categoryId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Categories", "RouteMappings"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
