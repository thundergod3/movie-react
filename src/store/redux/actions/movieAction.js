import * as types from "../../../constants/types";

class movieAction {
	fetchMovieRequest() {
		return {
			type: types.FETCH_MOVIE_REQUEST,
		};
	}
	fetchMovieSucceeded(movieList) {
		return {
			type: types.FETCH_MOVIE_SUCCEEDED,
			movieList,
		};
	}

	fetchMovieDetailRequest(_id) {
		return {
			type: types.FETCH_MOVIE_DETAIL_REQUEST,
			_id,
		};
	}
	fetchMovieDetailSucceeded(movieDetail) {
		return {
			type: types.FETCH_MOVIE_DETAIL_SUCCEEDED,
			movieDetail,
		};
	}

	deleteMovieRequest(_id) {
		return {
			type: types.DELETE_MOVIE_REQUEST,
			_id,
		};
	}
	deleteMovieSucceeded(_id) {
		return {
			type: types.DELETE_MOVIE_SUCCEEDED,
			_id,
		};
	}

	likeUnlikeMovieRequest(_id) {
		return {
			type: types.LIKE_UNLIKE_MOVIE_REQUEST,
			_id,
		};
	}
	likeUnlikeMovieSucceeded(_id) {
		return {
			type: types.LIKE_UNLIKE_MOVIE_SUCCEEDED,
			_id,
		};
	}

	changePagination(page) {
		return {
			type: types.CHANGE_PAGINATION_MOVIE,
			page,
		};
	}

	paginationRequest(items, pageNumber, pageSize) {
		return {
			type: types.PAGINATION_MOVIE_REQUEST,
			items,
			pageNumber,
			pageSize,
		};
	}
	paginationSucceeded(newMovieList) {
		return {
			type: types.PAGINATION_MOVIE_SUCCEEDED,
			newMovieList,
		};
	}

	filterByGenreRequest(genreSelect) {
		return {
			type: types.FILTER_BY_GENRE_REQUEST,
			genreSelect,
		};
	}
	filterByGenreSucceeded(genreSelect) {
		return {
			type: types.FILTER_BY_GENRE_SUCCEEDED,
			genreSelect,
		};
	}

	sortMovieRequest(sortProp) {
		return {
			type: types.SORT_MOVIE_REQUEST,
			sortProp,
		};
	}
	sortMovieSucceeded(sortProp) {
		return {
			type: types.SORT_MOVIE_SUCCEEDED,
			sortProp,
		};
	}

	saveMovieRequest(movieChange) {
		return {
			type: types.SAVE_MOVIE_REQUEST,
			movieChange,
		};
	}
	saveMovieSucceeded(movieChange) {
		return {
			type: types.SAVE_MOVIE_SUCCEEDED,
			movieChange,
		};
	}

	createMovieRequest(newMovie) {
		return {
			type: types.CREATE_MOVIE_REQUEST,
			newMovie,
		};
	}
	createMovieSucceeded(newMovie) {
		return {
			type: types.CREATE_MOVIE_SUCCEEDED,
			newMovie,
		};
	}

	searchMovieRequest(querySearch) {
		return {
			type: types.SERACH_MOVIE_REQUEST,
			querySearch,
		};
	}
	searchMovieSucceeded(querySearch) {
		return {
			type: types.SERACH_MOVIE_SUCCEEDED,
			querySearch,
		};
	}
}

export default new movieAction();
