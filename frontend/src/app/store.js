import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../feature/usersSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
  },
});
