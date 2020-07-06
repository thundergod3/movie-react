import HTTPMethod from "./index";

class movieService {
	fetchMovie = () => HTTPMethod.get("/movies").then((res) => res.data);

	fetchMovieDetail = (_id) => HTTPMethod.get(`/movies/${_id}`).then((res) => res.data);

	addMovie = (newMovie) => HTTPMethod.post("/movies", newMovie);

	deleteMovie = (id) => HTTPMethod.delete(`/movies/${id}`);

	saveMovie = (movieChange) => HTTPMethod.put(`/movies/${movieChange._id}`, movieChange);
}

export default new movieService();
