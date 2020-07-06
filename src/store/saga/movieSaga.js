import { takeEvery, takeLatest, call, put, select } from "redux-saga/effects";

import * as types from "../../constants/types";
import _ from "lodash";
import history from "../../constants/history";
import movieService from "../../services/movieService";
import HTTPMethod from "../../services";

import movieAction from "../redux/actions/movieAction";
import utilAction from "../redux/actions/utilAction";
import errorAction from "../redux/actions/errorAction";
import cookieLocal from "../../helpers/cookieLocal";

function* fetchMovie({ changeMovieList }) {
	yield put(utilAction.loadingData({ name: "fetchMovie", loading: true }));

	try {
		let response;
		const {
			movieReducer: { currentPage, pageSize },
		} = yield select((state) => state);

		if (changeMovieList !== undefined) response = changeMovieList;
		else response = yield movieService.fetchMovie();

		yield put(movieAction.fetchMovieSucceeded(response));
		yield call(paginate, { items: response, currentPage, pageSize });
		yield put(utilAction.loadedData("fetchMovie"));
		yield put(errorAction.clearError("fetchMovie"));
	} catch (error) {
		console.log(error);
		yield put(errorAction.getError({ name: "fetchMovie", error: error }));
	}
}

function* fetchMovieDetail({ _id }) {
	yield put(utilAction.loadingData({ name: "fetchMovie", loading: true }));

	try {
		const {
			movieReducer: { movieList },
		} = yield select((state) => state);
		if (movieList.length === 0) {
			const response = yield movieService.fetchMovieDetail(_id);
			yield put(movieAction.fetchMovieDetailSucceeded(response));
		} else {
			let movieDetail = yield movieList.filter((movie) => movie._id === _id);
			let movieArrayToObject;
			for (let i = 0; i < movieDetail.length; i++) {
				yield (movieArrayToObject = Object.assign({}, movieDetail[i]));
			}
			yield put(movieAction.fetchMovieDetailSucceeded(movieArrayToObject));
		}

		yield put(utilAction.loadedData({ name: "fetchMovie" }));
	} catch (error) {
		console.log(error);
		yield put(errorAction.getError({ name: "fetchMovieDetail", error: error }));
	}
}

function* deleteMovie({ _id }) {
	yield put(movieAction.deleteMovieSucceeded(_id));
	const {
		movieReducer: { pageNumber, pageSize, movieFilter, movieList, filterStatus },
	} = yield select((state) => state);
	yield call(paginate, { items: filterStatus ? movieFilter : movieList, pageNumber, pageSize });
	yield put(utilAction.getTypeNameToast("deleteMovie"));
	yield put(utilAction.showToastSucceeded(true));
	yield movieService.deleteMovie(_id);
	yield put(utilAction.getTypeNameToast(""));
	yield put(utilAction.showToastSucceeded(false));
}

function* paginate({ items, pageNumber, pageSize }) {
	if (!pageNumber) pageNumber = 1;
	const startIndex = (pageNumber - 1) * pageSize;
	const moviePagination = yield _(items).slice(startIndex).take(pageSize).value();
	yield put(movieAction.paginationSucceeded(moviePagination));
}

function* filterByGenre({ genreSelect }) {
	try {
		yield put(movieAction.filterByGenreSucceeded(genreSelect));
		const {
			movieReducer: { pageNumber, pageSize, movieFilter },
		} = yield select((state) => state);
		yield call(paginate, { items: movieFilter, pageNumber, pageSize });
	} catch (error) {
		console.log(error);
	}
}

function* sortMovie({ sortProp }) {
	const {
		movieReducer: { sortColumn, movieFilter, pageNumber, pageSize, filterStatus, movieList, sortStatus },
	} = yield select((state) => state);
	if (sortProp !== sortColumn.path) {
		yield put(movieAction.sortMovieSucceeded(sortProp));
		sortColumn.path = sortProp;
		sortColumn.order = "asc";
	} else {
		if (sortColumn.order === "desc") sortColumn.order = "asc";
		else sortColumn.order = "desc";
	}
	console.log(filterStatus);
	const sorted = _.orderBy(filterStatus ? movieFilter : movieList, [sortColumn.path], [sortColumn.order]);
	yield call(paginate, { items: sorted, pageNumber, pageSize });
}

function* likeUnlikeMovie({ _id }) {
	yield put(movieAction.likeUnlikeMovieSucceeded(_id));
	const {
		movieReducer: { movieList },
	} = yield select((state) => state);
	yield call(fetchMovie, { changeMovieList: movieList });
}

function* saveMovie({ movieChange }) {
	yield put(utilAction.loadingData({ name: "saveMovie", loading: true }));

	try {
		yield put(movieAction.saveMovieSucceeded(movieChange));
		const {
			movieReducer: { movieList },
		} = yield select((state) => state);
		yield call(fetchMovie, { changeMovieList: movieList });
		const token = yield cookieLocal.getFromCookie("token");
		yield HTTPMethod.attachTokenToHeader(token);
		yield movieService.saveMovie(movieChange);
		yield put(utilAction.loadedData({ name: "saveMovie" }));
		yield put(utilAction.getTypeNameToast("saveMovie"));
		yield put(utilAction.showToastSucceeded(true));
		yield put(errorAction.clearError("saveMovie"));
		yield history.push("/");
		yield put(utilAction.getTypeNameToast(""));
		yield put(utilAction.showToastSucceeded(false));
	} catch (error) {
		console.log(error);
		yield put(
			errorAction.getError({
				name: "saveMovie",
				error:
					error.response !== undefined
						? error.response.data
						: "Something was wrong, please contact to dev to report about this issue",
			})
		);
		yield put(utilAction.showToastError(true));
		yield put(utilAction.getTypeNameToast("saveMovie"));
		yield put(utilAction.showToastError(false));
		yield put(utilAction.getTypeNameToast(""));
	}
}

function* createMovie({ newMovie }) {
	yield put(utilAction.loadingData({ name: "createMovie", loading: true }));

	try {
		yield put(movieAction.createMovieSucceeded(newMovie));
		yield movieService.addMovie(newMovie);
		yield put(utilAction.loadedData({ name: "createMovie" }));
		yield put(utilAction.getTypeNameToast("createMovie"));
		yield put(utilAction.showToastSucceeded(true));
		yield put(errorAction.clearError("createMovie"));
		yield put(utilAction.getTypeNameToast(""));
		yield put(utilAction.showToastSucceeded(false));
		yield history.push("/");
	} catch (error) {}
}

function* searchBar({ querySearch }) {
	yield put(movieAction.searchMovieSucceeded(querySearch));
	const {
		movieReducer: { movieList },
	} = yield select((state) => state);
	if (querySearch !== "") {
		yield call(fetchMovie, { changeMovieList: movieList });
	} else yield call(fetchMovie, { changeMovieList: undefined });
}

export default function* () {
	yield takeEvery(types.FETCH_MOVIE_REQUEST, fetchMovie);
	yield takeEvery(types.FETCH_MOVIE_DETAIL_REQUEST, fetchMovieDetail);
	yield takeEvery(types.DELETE_MOVIE_REQUEST, deleteMovie);
	yield takeEvery(types.PAGINATION_MOVIE_REQUEST, paginate);
	yield takeEvery(types.FILTER_BY_GENRE_REQUEST, filterByGenre);
	yield takeEvery(types.SORT_MOVIE_REQUEST, sortMovie);
	yield takeEvery(types.LIKE_UNLIKE_MOVIE_REQUEST, likeUnlikeMovie);
	yield takeEvery(types.SAVE_MOVIE_REQUEST, saveMovie);
	yield takeEvery(types.CREATE_MOVIE_REQUEST, createMovie);
	yield takeEvery(types.SERACH_MOVIE_REQUEST, searchBar);
}
