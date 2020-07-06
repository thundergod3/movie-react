import { fork, all } from "redux-saga/effects";
import movieSaga from "./saga/movieSaga";
import authSaga from "./saga/authSaga";

export default function* rootSaga() {
	yield all([fork(movieSaga), fork(authSaga)]);
}
