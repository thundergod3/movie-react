import axios from "axios";

class HTTPMethod {
	constructor() {
		this.axios = axios;
		this.axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
	}

	get = (...props) => axios.get(...props);

	post = (...props) => axios.post(...props);

	put = (...props) => axios.put(...props);

	delete = (...props) => axios.delete(...props);

	attachTokenToHeader = (token) => {
		axios.interceptors.request.use(
			function (config) {
				config.headers.common["x-auth-token"] = token;
				return config;
			},
			function (error) {
				return Promise.reject(error);
			}
		);
	};
}

export default new HTTPMethod();
