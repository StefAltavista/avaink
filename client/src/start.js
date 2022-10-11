import React from "react";
import * as ReactDOMClient from "react-dom/client";

import App from "./components/App";

//set up Redux
import { Provider } from "react-redux";
import reducer from "./redux/reducer.js";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import * as immutableState from "redux-immutable-state-invariant";
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);
const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);
root.render(app);
