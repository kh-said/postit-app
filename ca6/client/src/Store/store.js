import { configureStore } from '@reduxjs/toolkit'
import usersReducer from "../Features/UserSlice";
import postsReducer from "../Features/PostSlice"
export const store = configureStore({
  reducer: {
    users:usersReducer,
    posts:postsReducer
  },
})
