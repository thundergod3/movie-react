import React from "react";
import { Redirect } from "react-router";

import { Formik } from "formik";
import * as Yup from "yup";

import { useSelector, useDispatch } from "react-redux";
import authAction from "../store/redux/actions/authAction";

const yupSchema = Yup.object({
	email: Yup.string().required(),
	username: Yup.string().required(),
	password: Yup.string().required().min(6, "Password cannot have less 6 characters"),
	confirmPassword: Yup.string()
		.required()
		.when("password", {
			is: (val) => (val && val.length > 0 ? true : false),
			then: Yup.string().oneOf([Yup.ref("password")], "Both password need to be the same"),
		}),
});

const RegisterPage = () => {
	const {
		authReducer: { authentication, isAuthentication },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { registerUser } = authAction;

	if (authentication === true) return <Redirect to="/" />;

	return (
		<>
			{authentication !== null && (
				<Formik
					initialValues={{
						email: "",
						password: "",
						confirmPassword: "",
						username: "",
					}}
					validationSchema={yupSchema}
					onSubmit={(values, actions) =>
						dispatch(
							registerUser({
								email: values.email,
								password: values.password,
								name: values.username,
							})
						)
					}>
					{(props) => (
						<>
							<h1>Register</h1>
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
								<div className="form-group">
									<label htmlFor="confirmPassword">Confirm Password</label>
									<input
										value={props.values.confirmPassword}
										id="confirmPassword"
										type="password"
										className="form-control"
										onChange={props.handleChange("confirmPassword")}
										onBlur={props.handleBlur("confirmPassword")}
									/>
									{props.errors.confirmPassword && props.touched.confirmPassword ? (
										<div className="alert alert-danger">{props.errors.confirmPassword}</div>
									) : null}
								</div>
								<div className="form-group">
									<label htmlFor="username">Username</label>
									<input
										value={props.values.username}
										id="username"
										type="text"
										className="form-control"
										onChange={props.handleChange("username")}
										onBlur={props.handleBlur("username")}
									/>
									{props.errors.username && props.touched.username ? (
										<div className="alert alert-danger">{props.errors.username}</div>
									) : null}
								</div>
								<button
									className="btn btn-primary"
									onClick={props.handleSubmit}
									disabled={Object.keys(props.errors).length !== 0}>
									Register
								</button>
							</form>
						</>
					)}
				</Formik>
			)}
		</>
	);
};

export default RegisterPage;
