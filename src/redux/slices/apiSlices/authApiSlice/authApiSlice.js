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
  },
});

export default authApiSlice;
export const authApiAction = authApiSlice.actions;
