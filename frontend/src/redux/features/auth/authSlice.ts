import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { apiSlice } from "@/redux/api/apiSlice";

export interface IGenericResponse {
  status: string;
  message: string;
}

interface Credentials {
  username: string;
  password: string;
}

export interface AuthState {
  access_token: string | null;
}

const savedToken =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const initialState: AuthState = savedToken
  ? { access_token: JSON.parse(savedToken) }
  : {
      access_token: null,
    };

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<IGenericResponse, Credentials>({
      query(data) {
        return {
          url: "/register",
          method: "POST",
          body: data,
        };
      },
    }),
    obtainToken: builder.mutation<{ access_token: string }, FormData>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterUserMutation, useObtainTokenMutation } = authApi;

export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      return { access_token: null };
    },
    setToken: (state, action: PayloadAction<{ access_token: string }>) => {
      state.access_token = action.payload.access_token;
    },
  },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
