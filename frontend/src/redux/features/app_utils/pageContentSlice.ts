import { IPageContent } from "@/interfaces/content.interface";
import { apiSlice } from "@/redux/api/apiSlice";
import { EntityState, createEntityAdapter } from "@reduxjs/toolkit";

const pageContentsAdapter = createEntityAdapter<IPageContent>({
  sortComparer: (a, b) => a.title.localeCompare(b.title),
  selectId: (content) => content.title,
});

const initialState = pageContentsAdapter.getInitialState();

export const pageContentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPageContents: builder.query<EntityState<IPageContent>, void>({
      query: () => "/pages",
      transformResponse: (response: IPageContent[]) => {
        return pageContentsAdapter.addMany(initialState, response);
      },
      providesTags: ["PageContents"],
    }),
    createPageContent: builder.mutation<IPageContent, Partial<IPageContent>>({
      query: (content) => ({
        url: "/pages/create",
        method: "POST",
        credentials: "include",
        body: content,
      }),
      invalidatesTags: ["PageContents"],
    }),
    updatePageContent: builder.mutation<IPageContent, IPageContent>({
      query: (content) => ({
        url: "/pages/update",
        method: "PUT",
        credentials: "include",
        body: content,
      }),
      invalidatesTags: ["PageContents"],
    }),
    deletePageContent: builder.mutation<void, number>({
      query: (contentId) => ({
        url: `/pages/delete/${contentId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["PageContents"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPageContentsQuery,
  useCreatePageContentMutation,
  useUpdatePageContentMutation,
  useDeletePageContentMutation,
} = pageContentsApi;
