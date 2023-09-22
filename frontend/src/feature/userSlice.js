import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "user",
  initialState: { data: null, allUsers: [] }, // Vous pouvez utiliser un objet pour stocker à la fois les données de l'utilisateur et la liste de tous les utilisateurs.
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload; // Met à jour les données de l'utilisateur avec la valeur fournie dans l'action.
    },
    getAllUsers: (state, action) => {
      state.allUsers = action.payload; // Met à jour la liste de tous les utilisateurs avec la valeur fournie dans l'action.
    },
    clearUserData: (state) => {
      state.data = null; // Réinitialise les données de l'utilisateur à null lorsque l'utilisateur se déconnecte.
    },
  },
});

export const { setUserData, getAllUsers, clearUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
