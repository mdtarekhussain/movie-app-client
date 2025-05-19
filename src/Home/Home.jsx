import { useState } from "react";
import axios from "axios";
import MovieCard from "../Page/MovieCard";

const Home = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/search?query=${query}`
    );

    setMovies(res.data);
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 flex-grow"
        />
        <button
          onClick={searchMovies}
          className="bg-green-500 px-4 py-2 text-white rounded"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
