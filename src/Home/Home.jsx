import { useEffect, useState } from "react";
import MovieCard from "../Page/MovieCard";
import useAxios from "../Hook/useAxios";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [displayIndex, setDisplayIndex] = useState(0);
  const axiosSecure = useAxios();

  const firstPageSize = 30;
  const otherPageSize = 20;

  useEffect(() => {
    const fetchDefaultMovies = async () => {
      try {
        const res = await axiosSecure.get("/api/default-movies");
        setMovies(res.data.slice(0, 250));
      } catch (error) {
        console.error("Failed to load default movies", error);
      }
    };

    fetchDefaultMovies();
  }, [axiosSecure]);

  const searchMovies = async () => {
    try {
      const res = await axiosSecure.get(`/api/search?query=${query}`);
      setMovies(res.data.slice(0, 250));
      setDisplayIndex(0);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [displayIndex]);

  const getCurrentMovies = () => {
    if (displayIndex === 0) {
      return movies.slice(0, firstPageSize);
    } else {
      const start = firstPageSize + (displayIndex - 1) * otherPageSize;
      const end = start + otherPageSize;
      return movies.slice(start, end);
    }
  };

  const currentMovies = getCurrentMovies();

  const handleNext = () => {
    setDisplayIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setDisplayIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <div className=" ">
      <div className="fixed top-[64px] -mt-4  left-0 w-full z-40 bg-[#ffffff2b] px-2 shadow-md">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border px-2 flex-grow"
          />
          <button
            onClick={searchMovies}
            className="bg-green-500 px-4 py-2 text-white rounded"
          >
            Search
          </button>
        </div>
      </div>

      {/* Movies grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentMovies.map((movie) => (
          <MovieCard key={movie.imdbID || movie._id} movie={movie} />
        ))}
      </div>
      {/* Pagination Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        {displayIndex > 0 && (
          <button
            onClick={handlePrev}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            See Previous
          </button>
        )}
        {displayIndex === 0
          ? movies.length > firstPageSize && (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                See More
              </button>
            )
          : movies.length > firstPageSize + displayIndex * otherPageSize && (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                See More
              </button>
            )}
      </div>
    </div>
  );
};

export default Home;
