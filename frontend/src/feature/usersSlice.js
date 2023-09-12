import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: null,
  },
  reducers: {
    setUsersData: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default usersSlice.reducer;
export const { setUsersData } = usersSlice.actions;
