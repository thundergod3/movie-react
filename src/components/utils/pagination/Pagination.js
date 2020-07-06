import React from "react";

import _ from "lodash";

import { useSelector, useDispatch } from "react-redux";
import movieAction from "../../../store/redux/actions/movieAction";

const Pagination = () => {
	const {
		movieReducer: { movieList, pageSize, currentPage, filterStatus, movieFilter },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { changePagination } = movieAction;

	const itemCount = filterStatus ? movieFilter.length : movieList.length;
	const pageCount = Math.ceil(itemCount / pageSize);

	if (pageCount === 1) return null;

	return (
		<ul className="pagination">
			{_.range(1, pageCount + 1).map((page) => (
				<li className={page === currentPage ? "page-item active" : "page-item"} key={page}>
					<a className="page-link" onClick={() => dispatch(changePagination(page))}>
						{page}
					</a>
				</li>
			))}
		</ul>
	);
};

export default Pagination;
