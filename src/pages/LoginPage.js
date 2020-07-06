import React from "react";
import { Redirect } from "react-router";

import { Formik } from "formik";
import * as Yup from "yup";

import { useSelector, useDispatch } from "react-redux";
import authAction from "../store/redux/actions/authAction";

const yupSchema = Yup.object({
	email: Yup.string().required(),
	password: Yup.string().required().min(6, "Password cannot have less 6 characters"),
});

const LoginPage = () => {
	const {
		authReducer: { authentication, isAuthentication },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { loginUser } = authAction;

	if (authentication === true) return <Redirect to="/" />;

	return (
		<>
			{authentication !== null && (
				<Formik
					initialValues={{
						email: "",
						password: "",
					}}
					validationSchema={yupSchema}
					onSubmit={(values, actions) =>
						dispatch(
							loginUser({
								email: values.email,
								password: values.password,
							})
						)
					}>
					{(props) => (
						<>
							<h1>Login</h1>
							<form>
								<div className="form-group">
									<label htmlFor="email">Email</label>
									<input
										value={props.values.email}
										autoFocus
										id="email"
										type="text"
										className="form-control"
										onChange={props.handleChange("email")}
										onBlur={props.handleBlur("email")}
									/>
									{props.errors.email && props.touched.email ? (
										<div className="alert alert-danger">{props.errors.email}</div>
									) : null}
								</div>
								<div className="form-group">
									<label htmlFor="password">Password</label>
									<input
										value={props.values.password}
										id="password"
										type="password"
										className="form-control"
										onChange={props.handleChange("password")}
										onBlur={props.handleBlur("password")}
									/>
									{props.errors.password && props.touched.password ? (
										<div className="alert alert-danger">{props.errors.password}</div>
									) : null}
								</div>
								<button
									className="btn btn-primary"
									onClick={props.handleSubmit}
									disabled={Object.keys(props.errors).length !== 0}>
									Login
								</button>
							</form>
						</>
					)}
				</Formik>
			)}
		</>
	);
};

export default LoginPage;
