import { takeEvery, takeLatest, call, put, select } from "redux-saga/effects";

import * as types from "../../constants/types";
import _ from "lodash";
import history from "../../constants/history";
import authService from "../../services/authService";
import cookieLocal from "../../helpers/cookieLocal";
import jwtDecode from "jwt-decode";

import authAction from "../redux/actions/authAction";
import utilAction from "../redux/actions/utilAction";
import errorAction from "../redux/actions/errorAction";

function* registerUser({ userInfo }) {
	yield put(utilAction.loadingData({ name: "register", loading: true }));

	try {
		const response = yield authService.registerUser(userInfo);
		yield cookieLocal.saveToCookie("token", response.token);
		yield call(checkAuthentication);
		yield put(utilAction.showToastSucceeded(true));
		yield put(utilAction.getTypeNameToast("register"));
		yield put(utilAction.showToastSucceeded(false));
		yield put(utilAction.getTypeNameToast(""));
	} catch (error) {
		console.log(error);
		yield put(errorAction.getError({ name: "register", error: error.response.data }));
		yield put(utilAction.showToastError(true));
		yield put(utilAction.getTypeNameToast("register"));
		yield put(utilAction.showToastError(false));
		yield put(utilAction.getTypeNameToast(""));
	}
}

function* loginUser({ userInfo }) {
	yield put(utilAction.loadingData({ name: "login", loading: true }));

	try {
		const response = yield authService.loginUser(userInfo);
		yield cookieLocal.saveToCookie("token", response);
		yield call(checkAuthentication);
		yield put(utilAction.showToastSucceeded(true));
		yield put(utilAction.getTypeNameToast("login"));
		yield put(utilAction.showToastSucceeded(false));
		yield put(utilAction.getTypeNameToast(""));
	} catch (error) {
		console.log(error);
		yield put(errorAction.getError({ name: "login", error: error.response.data }));
		yield put(utilAction.showToastError(true));
		yield put(utilAction.getTypeNameToast("login"));
		yield put(utilAction.showToastError(false));
		yield put(utilAction.getTypeNameToast(""));
	}
}

function* logoutUser() {
	yield cookieLocal.removeFromCookie("token");
	yield cookieLocal.removeFromLocal("user");
	yield call(checkAuthentication);
}

function* getUser() {
	try {
		const token = yield cookieLocal.getFromCookie("token");
		const user = jwtDecode(token);
		yield put(authAction.getUser(user));
		yield cookieLocal.saveToLocal("user", user);
	} catch (error) {
		console.log(error);
	}
}

function* checkAuthentication() {
	const token = yield cookieLocal.getFromCookie("token");
	if (!token) yield put(authAction.authenticationFailed());
	else {
		yield put(authAction.authenticationSucceeded());
		yield call(getUser);
	}
}

export default function* authSaga() {
	yield takeLatest(types.REGISTER_USER, registerUser);
	yield takeLatest(types.LOGIN_USER, loginUser);
	yield takeLatest(types.LOGOUT_USER, logoutUser);
	yield takeLatest(types.AUTHENTICATION_REQUEST, checkAuthentication);
}
