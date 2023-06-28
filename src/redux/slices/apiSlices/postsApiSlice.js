import { createSlice } from "@reduxjs/toolkit";

const NAMESPACE = "postsApi";

const initialState = {
  posts: []
};

const postsApiSlice = createSlice({
  name: NAMESPACE,
  initialState: initialState,
  reducers: {
    actionUpdateAllPosts(state, action) {
      state.posts = action.payload
    },
  },
});

export default postsApiSlice;
export const postsApiAction = postsApiSlice.actions;
