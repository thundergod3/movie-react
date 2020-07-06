import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CustomerPage from "./pages/CustomerPage";
import RentalPage from "./pages/RentalPage";
import NotFoundPage from "./pages/NotFoundPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import Navbar from "./components/layout/navbar/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateNewMoviePage from "./pages/CreateNewMoviePage";
import Notification from "./components/utils/notification/Notification";

import { useSelector, useDispatch } from "react-redux";
import authAction from "./store/redux/actions/authAction";

const App = () => {
	const {
		authReducer: { userInfo, authentication, isAuthentication },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { authenticationRequest } = authAction;

	useEffect(() => {
		dispatch(authenticationRequest());
	}, [authentication, isAuthentication]);

	return (
		<>
			<Navbar />
			<Notification />
			<main className="container-fluid">
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/login" component={LoginPage} />
					<Route path="/register" component={RegisterPage} />
					<Route path="/movie/:id" component={MovieDetailPage} />
					<Route path="/customers" component={CustomerPage} />
					<Route path="/rentals" component={RentalPage} />
					<Route path="/create-movie" component={CreateNewMoviePage} />
					<Route component={NotFoundPage} />
				</Switch>
			</main>
		</>
	);
};

export default App;
