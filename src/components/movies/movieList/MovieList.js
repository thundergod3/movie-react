import React, { useEffect } from "react";

import "./MovieList.scss";

import { useSelector, useDispatch } from "react-redux";
import movieAction from "../../../store/redux/actions/movieAction";

import MovieItem from "../movieItem/MovieItem";
import Pagination from "../../utils/pagination/Pagination";
import GenreList from "../genreList/GenreList";

const MovieList = () => {
	const {
		movieReducer: {
			movieList,
			currentPage,
			pageSize,
			moviePagination,
			filterStatus,
			movieFilter,
			sortColumn,
			sortStatus,
		},
		utilReducer: { loadingList },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { fetchMovieRequest, paginationRequest, sortMovieRequest } = movieAction;
	let loadingMovie;
	for (var i = 0; i < loadingList.length; i++) {
		if (loadingList[i].name === "fetchMovie") loadingMovie = loadingList[i];
	}

	useEffect(() => {
		if (movieList.length !== 0)
			dispatch(paginationRequest(filterStatus ? movieFilter : movieList, currentPage, pageSize));
	}, [currentPage]);

	const renderSortIcon = (path) => {
		if (sortColumn.path !== path) return;
		if (sortColumn.path === path && sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
		return <i className="fa fa-sort-desc"></i>;
	};

	if (loadingMovie && !loadingMovie.loading && movieList.length === 0)
		return <p>There are no movies in the database</p>;

	return (
		<div className="row">
			<div className="col-2">
				<GenreList />
			</div>
			<div className="col">
				<p>Showing {!filterStatus ? movieList.length : movieFilter.length} movies in the database</p>
				<table className="table">
					<thead>
						<tr>
							<th onClick={() => dispatch(sortMovieRequest("title"))}>Title {renderSortIcon("title")}</th>
							<th onClick={() => dispatch(sortMovieRequest("genre.name"))}>
								Genre {renderSortIcon("genre.name")}
							</th>
							<th onClick={() => dispatch(sortMovieRequest("numberInStock"))}>
								Stock {renderSortIcon("numberInStock")}
							</th>
							<th onClick={() => dispatch(sortMovieRequest("dailyRentalRate"))}>
								Rate {renderSortIcon("dailyRentalRate")}
							</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{moviePagination.map((movie) => (
							<MovieItem key={movie._id} movie={movie} />
						))}
					</tbody>
				</table>
				<Pagination />
			</div>
		</div>
	);
};

export default MovieList;
