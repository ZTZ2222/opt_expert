import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ToggleState {
  toggleCart: boolean;
  toggleCountriesMenu: boolean;
  toggleMobileNavbar: boolean;
  toggleDarkOverlay: boolean;
}

const initialState: ToggleState = {
  toggleCart: false,
  toggleCountriesMenu: false,
  toggleMobileNavbar: false,
  toggleDarkOverlay: false,
};

export const toggleSlice = createSlice({
  name: "toggleMenu",
  initialState,
  reducers: {
    toggleSwitchCart: (state, action: PayloadAction<boolean>) => {
      state.toggleCart = action.payload;
    },
    toggleSwitchCountriesMenu: (state, action: PayloadAction<boolean>) => {
      state.toggleCountriesMenu = action.payload;
    },
    toggleSwitchMobileNavbar: (state, action: PayloadAction<boolean>) => {
      state.toggleMobileNavbar = action.payload;
    },
    toggleSwitchDarkOverlay: (state, action: PayloadAction<boolean>) => {
      state.toggleDarkOverlay = action.payload;
    },
  },
});

export const {
  toggleSwitchCart,
  toggleSwitchCountriesMenu,
  toggleSwitchMobileNavbar,
  toggleSwitchDarkOverlay,
} = toggleSlice.actions;
export default toggleSlice.reducer;
