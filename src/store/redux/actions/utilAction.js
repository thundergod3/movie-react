import * as types from "../../../constants/types";

class utilAction {
	loadingData = (loading) => {
		return {
			type: types.LOADING_DATA,
			loading,
		};
	};
	loadedData = (loadingName) => {
		return {
			type: types.LOADED_DATA,
			loadingName,
		};
	};

	getTypeNameToast = (typeName) => {
		return {
			type: types.GET_TYPE_NAME_TOAST,
			typeName,
		};
	};

	showToastSucceeded = (showToastSucceeded) => {
		return {
			type: types.SHOW_TOAST_SUCCEEDED,
			showToastSucceeded,
		};
	};
	showToastError = (showToastError) => {
		return {
			type: types.SHOW_TOAST_ERROR,
			showToastError,
		};
	};
}

export default new utilAction();
