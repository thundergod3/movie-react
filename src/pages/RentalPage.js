import React from "react";
import { Redirect } from "react-router";

import { useSelector } from "react-redux";

const RentalPage = () => {
	const {
		authReducer: { userInfo, authentication },
	} = useSelector((state) => state);

	if (authentication === false) return <Redirect to="/login" />;

	if (Object.keys(userInfo).length !== 0 && !userInfo.isAdmin) return <Redirect to="/" />;

	return <>{authentication !== null && <div>Rental Page</div>}</>;
};

export default RentalPage;
