import { createSlice } from "@reduxjs/toolkit";
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
          updateData(newPost.id, newPost);
          return newPost;
        }
        return post;
      });
    },
    actionAddPost(state, action) {
      const newPost = action.payload;
      const newPosts = [...state.posts, newPost]
      state.posts = newPosts
    },
    actionDeletePost(state, action) {
      const postId = action.payload; 
      state.posts = state.posts.filter(p => p.id !== postId)
    },
    actionIncrementLike(state, action) {
      const { postId } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        post.like += 1;
      }
    },
  },
});

export default postsApiSlice;
export const postsApiAction = postsApiSlice.actions;
