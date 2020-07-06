import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useSelector } from "react-redux";

const Notification = () => {
	let [showCountToastSucceeded, setShowCountToastSucceeded] = useState(0);
	let [showCountToastError, setShowCountToastError] = useState(0);
	const {
		authReducer: { userInfo },
		utilReducer: { typeName, showToastSucceeded, showToastError },
		errorReducer: { errorList },
	} = useSelector((state) => state);

	useEffect(() => {
		setShowCountToastSucceeded((showCountToastSucceeded = showCountToastSucceeded + 1));

		console.log(showCountToastSucceeded);
	}, [showToastSucceeded]);

	useEffect(() => setShowCountToastError((showCountToastError = showCountToastError + 1)), [showToastError]);

	if (typeName === "deleteMovie" && showToastSucceeded && showCountToastSucceeded === 2) {
		setShowCountToastSucceeded(0);
		toast.error("This movie has been deleted");
	}

	if (typeName === "saveMovie" && showToastSucceeded && showCountToastSucceeded === 2) {
		setShowCountToastSucceeded(0);
		toast.success("The movie has been changed");
	}

	if (typeName === "createMovie" && showToastSucceeded && showCountToastSucceeded === 2) {
		setShowCountToastSucceeded(0);
		toast.success("A new movie has been created");
	}

	if (typeName === "login" && showToastSucceeded && showCountToastSucceeded === 2) {
		console.log(userInfo);
		setShowCountToastSucceeded(0);
		toast.success(`Welcome back ${userInfo.name}`);
	}

	if (typeName === "register" && showToastSucceeded && showCountToastSucceeded === 2) {
		console.log(userInfo);
		setShowCountToastSucceeded(0);
		toast.success(`Welcome ${userInfo.name} to visit our website`);
	}

	if (errorList.length !== 0) {
		for (var i = 0; i < errorList.length; i++) {
			if (errorList[i].name === typeName && showCountToastError === 2) {
				setShowCountToastError(0);
				toast.error(errorList[i].error);
			}
		}
	}

	return <ToastContainer />;
};

export default Notification;
