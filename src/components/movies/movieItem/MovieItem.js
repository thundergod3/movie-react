import React from "react";

import { useDispatch, useSelector } from "react-redux";
import movieAction from "../../../store/redux/actions/movieAction";

import LikeUnlike from "../likeUnlike/LikeUnlike";
import { Link } from "react-router-dom";

const MovieItem = ({
	movie: {
		title,
		genre: { name },
		numberInStock,
		dailyRentalRate,
		_id,
		liked,
	},
}) => {
	const {
		authReducer: { authentication },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { deleteMovieRequest } = movieAction;

	return (
		<tr>
			<td>
				<Link to={`/movie/${_id}`}>{title}</Link>
			</td>
			<td>{name}</td>
			<td>{numberInStock}</td>
			<td>{dailyRentalRate}</td>
			<td>
				<LikeUnlike _id={_id} liked={liked} />
			</td>
			{authentication && (
				<td>
					<button onClick={() => dispatch(deleteMovieRequest(_id))} className="btn btn-danger btn-sm">
						Delete
					</button>
				</td>
			)}
		</tr>
	);
};

export default MovieItem;
