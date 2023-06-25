import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import { composeWithDevTools } from "redux-devtools-extension";
import taskReducer from "./components/reducers/taskReducer";
import userReducer from "./components/reducers/userReducer";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

const rootReducer = combineReducers({
  taskReducer,
  userReducer,
});
const store = createStore(rootReducer, composeWithDevTools());
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
