import { IContent } from "@/interfaces/content.interface";
import { apiSlice } from "@/redux/api/apiSlice";
import { EntityState, createEntityAdapter } from "@reduxjs/toolkit";

const contentsAdapter = createEntityAdapter<IContent>({
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const initialState = contentsAdapter.getInitialState();

export const contentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContents: builder.query<EntityState<IContent>, void>({
      query: () => "/content",
      transformResponse: (response: IContent[]) => {
        return contentsAdapter.addMany(initialState, response);
      },
      providesTags: ["Contents"],
    }),
    createContent: builder.mutation<IContent, Partial<IContent>>({
      query: (content) => ({
        url: "/content/create",
        method: "POST",
        credentials: "include",
        body: content,
      }),
      invalidatesTags: ["Contents"],
    }),
    updateContent: builder.mutation<IContent, IContent>({
      query: (content) => ({
        url: "/content/update",
        method: "PUT",
        credentials: "include",
        body: content,
      }),
      invalidatesTags: ["Contents"],
    }),
    deleteContent: builder.mutation<void, number>({
      query: (contentId) => ({
        url: `/content/delete/${contentId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Contents"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetContentsQuery,
  useCreateContentMutation,
  useUpdateContentMutation,
  useDeleteContentMutation,
} = contentsApi;
