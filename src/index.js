import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.scss";
import store from "./app/store";
import { Provider } from "react-redux";
import { UserProvider } from "./context/UserContext";

ReactDOM.render(
  <Provider store={store}>
    <UserProvider>
      <App />
    </UserProvider>
  </Provider>,
  document.getElementById("root")
);
