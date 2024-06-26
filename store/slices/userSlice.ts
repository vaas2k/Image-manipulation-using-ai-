"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateUser } from "@/types/types";

const initialState: CreateUser = {
  _id : "",
  clerkId: "",
  username: "",
  email: "",
  credits: null,
  firstName: "",
  lastName: "",
  plan: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload._id;
      state.username = action.payload.username;
      state.clerkId = action.payload.clerkId;
      state.email = action.payload.email;
      state.credits = action.payload.credits;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.plan = action.payload.plan;
    },
    resetUser: (state) => {
      (state._id = ""),
      (state.clerkId = ""),
        (state.username = ""),
        (state.email = ""),
        (state.credits = null),
        (state.firstName = ""),
        (state.lastName = ""),
        (state.plan = 0);
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
