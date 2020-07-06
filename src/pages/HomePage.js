import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import movieAction from "../store/redux/actions/movieAction";

import MovieList from "../components/movies/movieList/MovieList";
import { Redirect } from "react-router";

const HomePage = () => {
	const {
		utilReducer: { loadingList },
		authReducer: { authentication },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { fetchMovieRequest } = movieAction;
	let loadingMovie;
	for (var i = 0; i < loadingList.length; i++) {
		if (loadingList[i].name === "fetchMovie") loadingMovie = loadingList[i];
	}

	useEffect(() => {
		dispatch(fetchMovieRequest());
	}, []);

	return (
		<>
			{loadingMovie !== undefined ? (
				loadingMovie.loading ? (
					"Loading..."
				) : (
					<>
						<MovieList />
					</>
				)
			) : (
				"Loading..."
			)}
		</>
	);
};

export default HomePage;
