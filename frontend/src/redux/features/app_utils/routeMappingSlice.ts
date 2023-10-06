import { IRouteMapping } from "@/interfaces/content.interface";
import { apiSlice } from "@/redux/api/apiSlice";
import { EntityState, createEntityAdapter } from "@reduxjs/toolkit";

const routeMappingsAdapter = createEntityAdapter<IRouteMapping>({
  sortComparer: (a, b) => a.slug_en.localeCompare(b.slug_en),
  selectId: (routeMapping) => routeMapping.slug_en,
});

const initialState = routeMappingsAdapter.getInitialState();

export const routeMappingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRouteMappings: builder.query<EntityState<IRouteMapping>, void>({
      query: () => "/content/route-mapping",
      transformResponse: (response: IRouteMapping[]) => {
        return routeMappingsAdapter.addMany(initialState, response);
      },
      providesTags: ["RouteMappings"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetRouteMappingsQuery } = routeMappingsApi;
