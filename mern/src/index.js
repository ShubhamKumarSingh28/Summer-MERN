// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
);
