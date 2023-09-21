import React from 'react';
import ReactDOM from 'react-dom';
import "./styles/index.scss";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from "./app/store";
import axios from "axios";
import { getAllUsers } from './feature/userSlice';

// Dev tool
import logger from "redux-logger";

const fetchAllUsers = async () => {
  try {
    const response = await axios.get("http://localhost:3000/user/get-all-users");
    store.dispatch(getAllUsers(response.data));
    console.log("State updated: ", store.getState());
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
  }
};

fetchAllUsers(); 

const root = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);

// Si vous souhaitez mesurer les performances de votre application, vous pouvez utiliser reportWebVitals
reportWebVitals();
