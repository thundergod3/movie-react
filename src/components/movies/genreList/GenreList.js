import React from "react";

import { useSelector } from "react-redux";
import GenreItem from "../genreItem/GenreItem";

const GenreList = () => {
	const {
		movieReducer: { genreList },
	} = useSelector((state) => state);
	return (
		<ul className="list-group">
			{genreList.map((genre) => (
				<GenreItem genre={genre} key={genre._id} />
			))}
		</ul>
	);
};

export default GenreList;
