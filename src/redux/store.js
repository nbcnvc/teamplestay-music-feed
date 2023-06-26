import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./slices/rootSlice";

const store = configureStore({
  reducer: rootReducer
});

export default store;
