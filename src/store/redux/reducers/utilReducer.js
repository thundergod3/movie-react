import * as types from "../../../constants/types";

const initalState = {
	loadingList: [],
	typeName: "",
	showToastSucceeded: false,
	showToastError: false,
};

const utilReducer = (state = initalState, action) => {
	switch (action.type) {
		case types.LOADING_DATA: {
			return {
				...state,
				loadingList:
					state.loadingList.length === 0
						? [...state.loadingList, action.loading]
						: state.loadingList.map((loading) =>
								loading.name !== action.loading.name ? action.loading : loading
						  ),
			};
		}
		case types.LOADED_DATA: {
			return {
				...state,
				loadingList: state.loadingList.map((item) =>
					item.name === action.loadingName ? { ...item, loading: false } : item
				),
			};
		}

		case types.GET_TYPE_NAME_TOAST: {
			return {
				...state,
				typeName: action.typeName,
			};
		}

		case types.SHOW_TOAST_SUCCEEDED: {
			return {
				...state,
				showToastSucceeded: action.showToastSucceeded,
			};
		}
		case types.SHOW_TOAST_ERROR: {
			return {
				...state,
				showToastError: action.showToastError,
			};
		}

		default: {
			return state;
		}
	}
};

export default utilReducer;
