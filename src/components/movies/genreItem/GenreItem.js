import React from "react";

import { useSelector, useDispatch } from "react-redux";
import movieAction from "../../../store/redux/actions/movieAction";

const GenreItem = ({ genre: { _id, name } }) => {
	const {
		movieReducer: { currentGenre },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { filterByGenreRequest } = movieAction;

	return (
		<li
			className={currentGenre === name ? "list-group-item active" : "list-group-item"}
			key={_id}
			onClick={() => dispatch(filterByGenreRequest(name))}>
			{name}
		</li>
	);
};

export default GenreItem;
