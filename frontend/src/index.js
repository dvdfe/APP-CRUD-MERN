import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/index.scss"
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider} from "react-redux";
import { applyMiddleware } from "redux";
import store from "./app/store";

//dev tool
import logger from "redux-logger"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

console.log("State updated: ", store.getState());
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
