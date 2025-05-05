import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";


// Like or Unlike a Post
export const likePost = createAsyncThunk("posts/likePost", async (postData) => {
  try {
    const response = await axios.put(`${ENV.SERVER_URL}/likePost`, {
      postId: postData.postId,
      userId: postData.userId
    });
    const post = response.data.post;
    const msg = response.data.msg;
    return { post, msg };
  } catch (error) {
    console.log(error);
  }
});

// Save a New Post
export const savePost = createAsyncThunk("posts/savePost", async (postData) => {
  try {
    const response = await axios.post(`${ENV.SERVER_URL}/savePost`, {
      postMsg: postData.postMsg,
      email: postData.email
    });
    const post = response.data.post;
    const msg = response.data.msg;
    return { post, msg };
  } catch (error) {
    const msg = error.message;
    return { msg };
  }
});

// Get All Posts
export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  try {
    const response = await axios.get(`${ENV.SERVER_URL}/getPosts`);
    const posts = response.data.posts;
    const count = response.data.count;
    return { posts, count };
  } catch (error) {
    const msg = error.message;
    return { msg };
  }
});

const initialState = {
  status: "idle",
  comments: [],
  posts: [],
  likes: []
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(savePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(savePost.fulfilled, (state, action) => {
        state.status = "success";
        state.posts.unshift(action.payload.post);
      })
      .addCase(savePost.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = action.payload.posts;
      })
      .addCase(getPosts.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(likePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.status = "success";
        const updatedPostIndex = state.posts.findIndex(
          (post) => post._id === action.payload.post._id
        );
        if (updatedPostIndex !== -1) {
          state.posts[updatedPostIndex].likes = action.payload.post.likes;
        }
      })
      .addCase(likePost.rejected, (state) => {
        state.status = "rejected";
      });
  }
});

export default postSlice.reducer;
