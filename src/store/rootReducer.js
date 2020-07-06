import { combineReducers } from "redux";
import movieReducer from "./redux/reducers/movieReducer";
import authReducer from "./redux/reducers/authReducer";
import utilReducer from "./redux/reducers/utilReducer";
import errorReducer from "./redux/reducers/errorReducer";

const rootReducer = combineReducers({
	movieReducer,
	authReducer,
	utilReducer,
	errorReducer,
});

export default rootReducer;
