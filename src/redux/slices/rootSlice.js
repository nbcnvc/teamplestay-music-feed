import { combineReducers } from "@reduxjs/toolkit";

import { authApiSlice } from "./apiSlices";

const rootReducer = combineReducers({
  authApi: authApiSlice.reducer,
})

export default rootReducer;
