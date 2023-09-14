import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userDataReducer from "../feature/userSlice";
import logger from "redux-logger"; 

const store = configureStore({
  reducer: {
    user: userDataReducer,
    // Ajout d'autres réducteurs ici si nécessaire
  },
  middleware: [...getDefaultMiddleware(), logger], // Middleware redux-logger
});

export default store;
