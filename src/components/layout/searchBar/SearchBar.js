import React from "react";

import { Formik } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import movieAction from "../../../store/redux/actions/movieAction";

const SearchBar = () => {
	const dispatch = useDispatch();
	const { searchMovieRequest } = movieAction;

	return (
		<Formik
			initialValues={{ querySearch: "" }}
			onSubmit={(values, actions) => dispatch(searchMovieRequest(values.querySearch))}>
			{(props) => (
				<div className="form-inline my-2 my-lg-0">
					<input
						className="form-control mr-sm-2"
						type="search"
						placeholder="Search"
						aria-label="Search"
						onChange={props.handleChange("querySearch")}
					/>
					<button className="btn btn-outline-success my-2 my-sm-0" onClick={props.handleSubmit}>
						Search
					</button>
				</div>
			)}
		</Formik>
	);
};

export default SearchBar;
