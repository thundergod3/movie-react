import * as types from "../../../constants/types";

class errorAction {
	getError(error) {
		return {
			type: types.GET_ERROR,
			error,
		};
	}
	clearError(errorName) {
		return {
			type: types.CLEAR_ERROR,
		};
	}
}

export default new errorAction();
