import React from "react";
import { Redirect } from "react-router";

import { useSelector } from "react-redux";

const CustomerPage = () => {
	const {
		authReducer: { userInfo, authentication },
	} = useSelector((state) => state);

	if (authentication === false) return <Redirect to="/login" />;

	if (Object.keys(userInfo).length !== 0 && !userInfo.isAdmin) return <Redirect to="/" />;

	return <>{authentication !== null && <div>Customers</div>}</>;
};

export default CustomerPage;
