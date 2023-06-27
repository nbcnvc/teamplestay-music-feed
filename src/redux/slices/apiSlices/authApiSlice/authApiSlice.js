import { createSlice } from "@reduxjs/toolkit";

const NAMESPACE = "authApi";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null,
};

const authApiSlice = createSlice({
  name: NAMESPACE,
  initialState: initialState,
  reducers: {
    actionRequestedSignup(state) {
      state.isLoading = true;
    },
    actionSuccessSignup(state) {
      state.isLoading = false;
    },
    actionSignin(state) {
      state.isAuthenticated = true;
    },
    actionSignout(state) {
      state.isAuthenticated = false;
    },
    actionRequestedLogin(state) {
      state.isLoading = true;
    },
    actionSuccessLogin(state) {
      state.isLoading = false;
      state.isAuthenticated = true;
    },
    actionFailedLogin(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default authApiSlice;
export const authApiAction = authApiSlice.actions;
