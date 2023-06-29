import { combineReducers } from "@reduxjs/toolkit";

import { authApiSlice, postsApiSlice } from "./apiSlices";

const rootReducer = combineReducers({
  authApi: authApiSlice.reducer,
  postsApi: postsApiSlice.reducer,
});

export default rootReducer;
