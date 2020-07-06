import React, { useEffect } from "react";
import { Redirect } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import movieAction from "../store/redux/actions/movieAction";

import { Formik } from "formik";
import * as Yup from "yup";

const MovieDetailPage = ({
	match: {
		params: { id },
	},
}) => {
	const {
		movieReducer: { movieDetail },
		authReducer: { userInfo, authentication },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { fetchMovieDetailRequest, saveMovieRequest } = movieAction;

	const yupSchema = Yup.object({
		title: Yup.string().required().min(5, "Title cannot less than 5").max(50, "Title cannot higher than 50"),
		nameGenre: Yup.string().required(),
		numberInStock: Yup.number().required().min(0, "Number in stock cannot less than 0"),
		dailyRentalRate: Yup.number()
			.required()
			.min(0, "Rate cannot less than 0")
			.max(10, "Rate cannot higher than 10"),
	});

	useEffect(() => {
		dispatch(fetchMovieDetailRequest(id));
	}, []);

	if (authentication === false) return <Redirect to="/login" />;

	if (Object.keys(userInfo).length !== 0 && !userInfo.isAdmin) return <Redirect to="/" />;

	return (
		<>
			{authentication !== null && (
				<Formik
					enableReinitialize
					initialValues={{
						title: Object.keys(movieDetail).length !== 0 ? movieDetail.title : "",
						nameGenre: Object.keys(movieDetail).length !== 0 ? movieDetail.genre.name : "",
						numberInStock: Object.keys(movieDetail).length !== 0 ? movieDetail.numberInStock : "",
						dailyRentalRate: Object.keys(movieDetail).length !== 0 ? movieDetail.dailyRentalRate : "",
					}}
					validationSchema={yupSchema}
					onSubmit={(values, actions) => {
						dispatch(
							saveMovieRequest({
								...movieDetail,
								title: values.title,
								numberInStock: values.numberInStock,
								dailyRentalRate: values.dailyRentalRate,
								genre: { _id: movieDetail.genre._id, name: values.nameGenre },
							})
						);
						actions.resetForm();
					}}>
					{(props) => (
						<>
							<h1>Change Movie</h1>
							<form>
								<div className="form-group">
									<label htmlFor="title">Title</label>
									<input
										value={props.values.title}
										autoFocus
										id="title"
										type="text"
										className="form-control"
										onChange={props.handleChange("title")}
										onBlur={props.handleBlur("title")}
									/>
									{props.errors.title && props.touched.title ? (
										<div className="alert alert-danger">{props.errors.title}</div>
									) : null}
								</div>
								<div className="form-group">
									<label htmlFor="nameGenre">Genre</label>
									<select
										className="custom-select"
										onChange={props.handleChange("nameGenre")}
										onBlur={props.handleBlur("nameGenre")}
										value={props.values.nameGenre}>
										<option value="" selected>
											Choose nameGenre
										</option>
										<option value="Action">Action</option>
										<option value="Comedy">Comedy</option>
										<option value="Thriller">Thriller</option>
									</select>
									{props.errors.nameGenre && props.touched.nameGenre ? (
										<div className="alert alert-danger">{props.errors.nameGenre}</div>
									) : null}
								</div>
								<div className="form-group">
									<label htmlFor="numberInStock">Number in Stock</label>
									<input
										value={props.values.numberInStock}
										id="numberInStock"
										type="number"
										className="form-control"
										onChange={props.handleChange("numberInStock")}
										onBlur={props.handleBlur("numberInStock")}
									/>
									{props.errors.numberInStock && props.touched.numberInStock ? (
										<div className="alert alert-danger">{props.errors.numberInStock}</div>
									) : null}
								</div>
								<div className="form-group">
									<label htmlFor="dailyRentalRate">Rate</label>
									<input
										value={props.values.dailyRentalRate}
										id="dailyRentalRate"
										type="number"
										className="form-control"
										onChange={props.handleChange("dailyRentalRate")}
										onBlur={props.handleBlur("dailyRentalRate")}
									/>
									{props.errors.dailyRentalRate && props.touched.dailyRentalRate ? (
										<div className="alert alert-danger">{props.errors.dailyRentalRate}</div>
									) : null}
								</div>
								<button
									className="btn btn-primary"
									onClick={props.handleSubmit}
									disabled={Object.keys(props.errors).length !== 0}>
									Save
								</button>
							</form>
						</>
					)}
				</Formik>
			)}
		</>
	);
};

export default MovieDetailPage;
