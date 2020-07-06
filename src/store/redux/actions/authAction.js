import * as types from "../../../constants/types";
import { retry } from "redux-saga/effects";

class authAction {
	registerUser(userInfo) {
		return {
			type: types.REGISTER_USER,
			userInfo,
		};
	}

	loginUser(userInfo) {
		return {
			type: types.LOGIN_USER,
			userInfo,
		};
	}

	logoutUser() {
		return {
			type: types.LOGOUT_USER,
		};
	}

	authenticationRequest() {
		return {
			type: types.AUTHENTICATION_REQUEST,
		};
	}
	authenticationSucceeded() {
		return {
			type: types.AUTHENTICATION_SUCCEEDED,
		};
	}
	authenticationFailed() {
		return {
			type: types.AUTHENTICATION_FAILED,
		};
	}

	getUser(userInfo) {
		return {
			type: types.GET_USER,
			userInfo,
		};
	}
}

export default new authAction();
