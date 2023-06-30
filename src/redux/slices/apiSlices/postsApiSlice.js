import { createSlice } from "@reduxjs/toolkit";
import { setDoc } from "firebase/firestore";
import { updateData } from "../../../services/firestore";

const NAMESPACE = "postsApi";

const initialState = {
  posts: [],
};

const postsApiSlice = createSlice({
  name: NAMESPACE,
  initialState: initialState,
  reducers: {
    actionUpdateAllPosts(state, action) {
      state.posts = action.payload;
    },
    actionEditPost(state, action) {
      const newPost = action.payload;
      state.posts = state.posts.map((post) => {
        if (post.id === newPost.id) {
          updateData(newPost.id, newPost)
          return newPost;
        }
        return post;
      });
    },
  },
});

export default postsApiSlice;
export const postsApiAction = postsApiSlice.actions;
