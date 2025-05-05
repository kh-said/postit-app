
import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
//To the update posts- like and dislike
export const likePost = createAsyncThunk("posts/likePost",async(postData)=>{
   try{
     const response = await axios.put("http://localhost:3001/likePost",{
        postId : postData.postId,
        userId : postData.userId
     })
     const post = response.data.post
     const msg = response.data.msg
     return({post,msg})
   }
   catch(error){
      console.log(error)
   }
})

export const savePost = createAsyncThunk(
  "posts/savePost",
  async (postData) => {
    try {
      //sends a POST request to the server along the request body object
      const response = await axios.post("http://localhost:3001/savePost", {
        postMsg: postData.postMsg,
        email: postData.email
      });
      console.log(response);
      const post = response.data.post;
      const msg = response.data.msg;//retrieve the response from the server
      return {post,msg}; //return the response from the server as payload to the thunk
    } catch (error) {
      
      const msg = error.message;
      return {msg}
      
    }
  }
);

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async () => {
    try {
      //sends a Get request to the retrieve the posts from mongodb collection
      const response = await axios.get("http://localhost:3001/getPosts");
      console.log(response);
      const posts = response.data.posts;
      const count = response.data.count;//retrieve the response from the server
      return {posts,count}; //return the response from the server as payload to the thunk
    } catch (error) {
      
      const msg = error.message;
      return {msg}
      
    }
  }
);



const initialState = {
  status: "idle",
  comments:[],
  posts:[],
  likes:[]
 
};



export const postSlice = createSlice({
  name: "posts", //name of the state
  initialState,
  reducers: {
    // Synchronous actions that update the state directly,
  },
  //builder.addCase(action creator(pending, fulfilled, rejected), reducer)

  extraReducers: (builder)=>{
    builder
    .addCase(savePost.pending, (state) => {
      state.status =  "loading"
    })
    .addCase(savePost.fulfilled, (state, action) => {
      state.status =  "success";
      
      state.posts.unshift(action.payload.post);
    })
    .addCase(savePost.rejected, (state) => {
      state.status =  "rejected";
    })
    .addCase(getPosts.pending, (state) => {
      state.status =  "loading"
    })
    .addCase(getPosts.fulfilled, (state, action) => {
      state.status =  "success";
      state.posts = action.payload.posts;
    })
    .addCase(getPosts.rejected, (state) => {
      state.status =  "rejected";
    })
    .addCase(likePost.pending, (state) => {
      state.status =  "loading"
    })
    .addCase(likePost.fulfilled, (state, action) => {
      state.status =  "success";
      console.log(action.payload)
      const updatedPostIndex = state.posts.findIndex(
        (post) => post._id === action.payload._id)
      if(updatedPostIndex !== -1){
        state.posts[updatedPostIndex].likes = action.payload.likes
      }


      
    })
    .addCase(likePost.rejected, (state) => {
      state.status =  "rejected";
    })
  }
}); //end of slice

export default postSlice.reducer;
