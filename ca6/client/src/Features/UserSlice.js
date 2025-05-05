import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";

export const login = createAsyncThunk(
  "users/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${ENV.SERVER_URL}//login`, {
        email: userData.email,
        password: userData.password,
      });
      const user = response.data.user;
      const msg = response.data.msg;
      return { user, msg };
    } catch (error) {
      let msg = "Something went wrong";
      if (error.response && error.response.data && error.response.data.msg) {
        msg = error.response.data.msg;
      } else if (error.message) {
        msg = error.message;
      }
      return rejectWithValue({ msg });
    }
  }
);

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData) => {
    try {
      const response = await axios.post(`${ENV.SERVER_URL}/registerUser`, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      const user = response.data.user;
      const msg = response.data.msg;
      return { user, msg };
    } catch (error) {
      const msg = error.message;
      return { msg };
    }
  }
);

export const logout = createAsyncThunk("users/logout", async () => {
  try {
    const response = await axios.post(`${ENV.SERVER_URL}/logout`);
    const msg = response.data.msg;
    return { msg };
  } catch (error) {
    const msg = error.message;
    return { msg };
  }
});

const initialState = {
  user: null,
  status: null,
  msg: null,
  isLogin: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload.user;
        state.msg = action.payload.msg;
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = "rejected";
        state.msg = "Unexpected error is occurred";
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload.user;
        state.msg = action.payload.msg;
        state.isLogin = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "rejected";
        state.msg = action.payload?.msg || "Login failed";
        state.isLogin = false;
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "success";
        state.user = null;
        state.msg = action.payload.msg;
        state.isLogin = false;
      })
      .addCase(logout.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default userSlice.reducer;
