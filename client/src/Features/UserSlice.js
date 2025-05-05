
import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "users/login",
  async (userData,{rejectWithValue}) => {
    try {
      //sends a POST request to the server along the request body object
      const response = await axios.post("http://localhost:3001/login", {
        email: userData.email,
        password: userData.password,
      });
      console.log(response);
      const user = response.data.user;
      const msg = response.data.msg;//retrieve the response from the server
      return {user,msg}; //return the response from the server as payload to the thunk
    } 
    catch (error) {
      
      const msg = error.response.data.msg;
      return rejectWithValue({msg})
      
    }
  }
);





export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData) => {
    try {
      //sends a POST request to the server along the request body object
      const response = await axios.post("http://localhost:3001/registerUser", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      console.log(response);
      const user = response.data.user;
      const msg = response.data.msg;//retrieve the response from the server
      return {user,msg}; //return the response from the server as payload to the thunk
    } catch (error) {
      
      const msg = error.message;
      return {msg}
      
    }
  }
);

export const logout = createAsyncThunk(
  "users/logout",
  async () => {
    try {
      //sends a POST request to the server along the request body object
      const response = await axios.post("http://localhost:3001/logout");
      const msg = response.data.msg;//retrieve the response from the server
      console.log(msg)
      return {msg}; //return the response from the server as payload to the thunk
    } catch (error) {
      
      const msg = error.message;
      return {msg}
      
    }
  }
);




const initialState = {
  user: null,
  status: null,
  msg: null,
  isLogin : false,
};



export const userSlice = createSlice({
  name: "users", //name of the state
  initialState,
  reducers: {
    // Synchronous actions that update the state directly,
  },
  //builder.addCase(action creator(pending, fulfilled, rejected), reducer)

  extraReducers: (builder) => {
    //Asynchronous actions that update the state directly,
    builder
      .addCase(registerUser.pending, (state) => {
        state.status =  "loading"
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status =  "success";
        state.user = action.payload.user;
        state.msg = action.payload.msg;

      })
      .addCase(registerUser.rejected, (state) => {
        state.status =  "rejected";
        state.msg = "Unexpected error is occurred";

      })
      .addCase(login.pending, (state) => {
        state.status =  "loading"
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status =  "success";
        state.user = action.payload.user;
        state.msg = action.payload.msg;
        state.isLogin= true
      })
      .addCase(login.rejected, (state,action) => {
        state.status =  "rejected";
        state.msg = action.payload.msg
        state.isLogin = false
      })
      .addCase(logout.pending, (state) => {
         state.status =  "loading"
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status =  "success";
        state.user = null;
        state.msg = action.payload.msg;
        state.isLogin= false
      })
      .addCase(logout.rejected, (state,action) => {
        state.status =  "rejected";
      })
  },
}); //end of slice

export default userSlice.reducer;
