import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "user",
  initialState: null, // L'état initial est null, car l'utilisateur n'est pas encore connecté.
  reducers: {
    setUserData: (state, action) => {
      return action.payload; // Met à jour l'ID de l'utilisateur avec la valeur fournie dans l'action.
    },
    clearUserData: (state) => {
      return null; // Réinitialise l'ID de l'utilisateur à null lorsque l'utilisateur se déconnecte.
    },
  },
});

export const { setUserData, clearUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
