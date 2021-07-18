import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./App.css";
import App from "./App";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
