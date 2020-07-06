import HTTPMethod from "./index";

class authService {
	registerUser = (userInfo) => HTTPMethod.post("/users", userInfo).then((res) => res.data);

	loginUser = (userInfo) => HTTPMethod.post("/auth", userInfo).then((res) => res.data);
}

export default new authService();
