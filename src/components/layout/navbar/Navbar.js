import React from "react";
import { Link, withRouter } from "react-router-dom";

import "./Navbar.scss";

import SearchBar from "../searchBar/SearchBar";

import { useSelector, useDispatch } from "react-redux";
import authAction from "../../../store/redux/actions/authAction";

const Navbar = ({
	history: {
		location: { pathname },
	},
}) => {
	const {
		authReducer: { userInfo, authentication },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { logoutUser } = authAction;
	const routeUser = [
		{
			path: "/profile",
			title: authentication && userInfo.name,
		},
		{
			path: "",
			title: "Logout",
		},
	];
	const routeAdmin = [
		{
			path: "/create-movie",
			title: "Add Movie",
		},
		{
			path: "/customers",
			title: "Customers",
		},
		{
			path: "/rentals",
			title: "Rentals",
		},
		{
			path: "/profile",
			title: authentication && userInfo.name,
		},
		{
			path: "",
			title: "Logout",
		},
	];
	const routeNotAuthentication = [
		{
			path: "/login",
			title: "Login",
		},
		{
			path: "/register",
			title: "Register",
		},
	];

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<Link className="navbar-brand" to="/">
				Vidly
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			{authentication !== null && (
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav mr-auto">
						{authentication
							? userInfo.isAdmin
								? routeAdmin.map((item) => (
										<li className="nav-item">
											<Link
												className={pathname !== item.path ? "nav-link" : "nav-link active"}
												to={item.path}
												onClick={() => (item.title === "Logout" ? dispatch(logoutUser()) : {})}>
												{item.title}
											</Link>
										</li>
								  ))
								: routeUser.map((item) => (
										<li className="nav-item">
											<Link
												className={pathname !== item.path ? "nav-link" : "nav-link active"}
												to={item.path}
												onClick={() => (item.title === "Logout" ? dispatch(logoutUser()) : {})}>
												{item.title}
											</Link>
										</li>
								  ))
							: routeNotAuthentication.map((item) => (
									<li className="nav-item">
										<Link
											className={pathname !== item.path ? "nav-link" : "nav-link active"}
											to={item.path}>
											{item.title}
										</Link>
									</li>
							  ))}
					</ul>
					<SearchBar />
				</div>
			)}
		</nav>
	);
};

export default withRouter(Navbar);
