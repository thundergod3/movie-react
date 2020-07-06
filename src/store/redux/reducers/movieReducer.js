import * as types from "../../../constants/types";

const initialState = {
	movieList: [],
	moviePagination: [],
	movieFilter: [],
	movieDetail: {},
	genreList: [
		{ name: "All Genres", _id: 1 },
		{
			_id: "5f019e8a2029e908999c27b0",
			name: "Action",
		},
		{
			_id: "5f019e892029e908999c27a9",
			name: "Comedy",
		},
		{
			_id: "5f019e8a2029e908999c27b7",
			name: "Romance",
		},
		{
			_id: "5f019e8a2029e908999c27be",
			name: "Thriller",
		},
	],
	sortColumn: { path: "title", order: "desc" },
	pageSize: 4,
	currentPage: 1,
	currentGenre: "All Genres",
	filterStatus: false,
	sortStatus: false,
};

const movieReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_MOVIE_SUCCEEDED: {
			return {
				...state,
				movieList: action.movieList,
			};
		}

		case types.FETCH_MOVIE_DETAIL_SUCCEEDED: {
			return {
				...state,
				movieDetail: action.movieDetail,
			};
		}

		case types.DELETE_MOVIE_SUCCEEDED: {
			return {
				...state,
				movieList: state.movieList.filter((movie) => movie._id !== action._id),
				currentPage: 1,
			};
		}

		case types.LIKE_UNLIKE_MOVIE_SUCCEEDED: {
			return {
				...state,
				movieList: state.movieList.map((movie) =>
					movie._id === action._id ? { ...movie, liked: !movie.liked } : movie
				),
			};
		}

		case types.CHANGE_PAGINATION_MOVIE: {
			return {
				...state,
				currentPage: action.page,
			};
		}

		case types.PAGINATION_MOVIE_SUCCEEDED: {
			return {
				...state,
				moviePagination: action.newMovieList,
			};
		}

		case types.FILTER_BY_GENRE_SUCCEEDED: {
			return {
				...state,
				currentGenre: action.genreSelect,
				filterStatus: action.genreSelect !== "All Genres" ? true : false,
				currentPage: action.genreSelect !== "All Genres" ? state.filterStatus : 1,
				movieFilter:
					action.genreSelect !== "All Genres"
						? state.movieList.filter((movie) => movie.genre.name === action.genreSelect)
						: state.movieList,
			};
		}

		case types.SORT_MOVIE_SUCCEEDED: {
			return {
				...state,
				sortColumn: { path: action.sortProp, order: "asc" },
				sortStatus: !state.sortStatus,
			};
		}

		case types.CREATE_MOVIE_SUCCEEDED: {
			return {
				...state,
				movieList: [...state.movieList, action.newMovie],
			};
		}

		case types.SERACH_MOVIE_SUCCEEDED: {
			return {
				...state,
				movieList: state.movieList.filter((query) =>
					query.title.toLowerCase().startsWith(action.querySearch.toLowerCase())
				),
			};
		}

		case types.SAVE_MOVIE_SUCCEEDED: {
			return {
				...state,
				movieList: state.movieList.map((movie) =>
					movie._id === action.movieChange._id ? action.movieChange : movie
				),
			};
		}

		default: {
			return state;
		}
	}
};

export default movieReducer;
