import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "user",
  initialState: { data: null, allUsers: [] },
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
    },
    getAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    followUser: (state, action) => {
      state.data.following.push(action.payload);
    },
    unfollowUser: (state, action) => {
      state.data.following = state.data.following.filter(
        (userId) => userId !== action.payload
      );
    },
    clearUserData: (state) => {
      state.data = null;
    },
  },
});

export const {
  setUserData,
  getAllUsers,
  followUser,
  unfollowUser,
  clearUserData,
} = userDataSlice.actions;

export default userDataSlice.reducer;
