import * as types from "../../../constants/types";

const initialState = {
	userInfo: {},
	authentication: null,
	isAuthentication: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.AUTHENTICATION_SUCCEEDED: {
			return {
				...state,
				authentication: true,
				isAuthentication: true,
			};
		}
		case types.AUTHENTICATION_FAILED: {
			return {
				...state,
				authentication: false,
				isAuthentication: false,
				userInfo: {},
			};
		}

		case types.GET_USER: {
			return {
				...state,
				userInfo: action.userInfo,
			};
		}

		default: {
			return state;
		}
	}
};

export default authReducer;
