import React from "react";

import { useSelector, useDispatch } from "react-redux";
import movieAction from "../../../store/redux/actions/movieAction";

const LikeUnlike = ({ _id, liked }) => {
	const dispatch = useDispatch();
	const { likeUnlikeMovieRequest } = movieAction;

	let classes = "fa fa-heart";

	if (!liked) classes += "-o";

	return (
		<i
			className={classes}
			aria-hidden="true"
			onClick={() => dispatch(likeUnlikeMovieRequest(_id))}
			style={{ cursor: "pointer" }}></i>
	);
};

export default LikeUnlike;
