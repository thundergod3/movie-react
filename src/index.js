import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";

import "font-awesome/css/font-awesome.css";
import "./index.scss";
import history from "./constants/history";

import store from "./store/configureStore";
import { Provider } from "react-redux";

import App from "./App";

ReactDOM.render(
	<>
		<Provider store={store}>
			<Router history={history}>
				<App />
			</Router>
		</Provider>
	</>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
