// import { useEffect, useState } from "react";
// import MovieCard from "../Page/MovieCard";
// import useAxios from "../Hook/useAxios";

// const Home = () => {
//   const [defaultMovies, setDefaultMovies] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);
//   const [query, setQuery] = useState("");
//   const [displayIndex, setDisplayIndex] = useState(0);
//   const [isSearching, setIsSearching] = useState(false);
//   const axiosSecure = useAxios();

//   const firstPageSize = 30;
//   const otherPageSize = 20;

//   useEffect(() => {
//     const fetchDefaultMovies = async () => {
//       try {
//         const res = await axiosSecure.get("/api/movies");
//         setDefaultMovies(res.data.slice(0, 250));
//       } catch (error) {
//         console.error("Failed to load default movies", error);
//       }
//     };

//     fetchDefaultMovies();
//   }, [axiosSecure]);

//   const searchMovies = async () => {
//     const trimmedQuery = query.trim();

//     if (!trimmedQuery) {
//       // যখন সার্চ খালি তখন ডিফল্ট ছবি দেখাবে
//       setIsSearching(false);
//       setSearchResults([]);
//       setDisplayIndex(0);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//       return;
//     }

//     try {
//       setIsSearching(true);
//       const res = await axiosSecure.get(`/api/search?query=${trimmedQuery}`);

//       if (res.data && res.data.length > 0) {
//         setSearchResults(res.data.slice(0, 250));
//       } else {
//         setSearchResults([]);
//       }
//       setDisplayIndex(0);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } catch (error) {
//       console.error("Search failed", error);
//       setSearchResults([]);
//     }
//   };

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [displayIndex]);

//   // কোন মুভি দেখাবে তা নির্ধারণ কর
//   const movies = isSearching ? searchResults : defaultMovies;

//   const getCurrentMovies = () => {
//     if (displayIndex === 0) {
//       return movies.slice(0, firstPageSize);
//     } else {
//       const start = firstPageSize + (displayIndex - 1) * otherPageSize;
//       const end = start + otherPageSize;
//       return movies.slice(start, end);
//     }
//   };

//   const currentMovies = getCurrentMovies();

//   const handleNext = () => {
//     setDisplayIndex((prev) => prev + 1);
//   };

//   const handlePrev = () => {
//     setDisplayIndex((prev) => (prev > 0 ? prev - 1 : 0));
//   };

//   return (
//     <div className="">
//       <div className="fixed top-[87px] -mt-4 left-0 w-full z-40 bg-[#ffffff2b] px-2 shadow-md">
//         <div className="flex gap-2">
//           <input
//             type="text"
//             placeholder="Search movies..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") searchMovies();
//             }}
//             className="border px-2 flex-grow"
//           />
//           <button
//             onClick={searchMovies}
//             className="bg-green-500 px-4 py-2 text-white rounded"
//           >
//             Search
//           </button>
//         </div>
//       </div>

//       {/* Movies grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 px-4">
//         {currentMovies.map((movie) => (
//           <MovieCard key={movie.imdbID || movie._id} movie={movie} />
//         ))}
//       </div>

//       {/* Pagination Buttons */}
//       <div className="flex justify-center gap-4 mt-6 mb-12">
//         {displayIndex > 0 && (
//           <button
//             onClick={handlePrev}
//             className="px-4 py-2 bg-blue-500 text-white rounded"
//           >
//             See Previous
//           </button>
//         )}
//         {movies.length >
//           (displayIndex === 0
//             ? firstPageSize
//             : firstPageSize + displayIndex * otherPageSize) && (
//           <button
//             onClick={handleNext}
//             className="px-4 py-2 bg-blue-500 text-white rounded"
//           >
//             See More
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
import { useEffect, useState, useContext } from "react";
import MovieCard from "../Page/MovieCard";
import useAxios from "../Hook/useAxios";
import SearchContext from "../Page/SearchProvider";

const Home = () => {
  const [defaultMovies, setDefaultMovies] = useState([]);
  const [displayIndex, setDisplayIndex] = useState(0);
  const { isSearching, searchResults } = useContext(SearchContext);
  const axiosSecure = useAxios();

  const firstPageSize = 30;
  const otherPageSize = 20;

  useEffect(() => {
    const fetchDefaultMovies = async () => {
      try {
        const res = await axiosSecure.get("/api/movies");
        setDefaultMovies(res.data.slice(0, 250));
      } catch (error) {
        console.error("Failed to load default movies", error);
      }
    };
    fetchDefaultMovies();
  }, [axiosSecure]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [displayIndex]);

  const movies = isSearching ? searchResults : defaultMovies;

  const getCurrentMovies = () => {
    if (displayIndex === 0) {
      return movies.slice(0, firstPageSize);
    } else {
      const start = firstPageSize + (displayIndex - 1) * otherPageSize;
      return movies.slice(start, start + otherPageSize);
    }
  };

  const handleNext = () => {
    setDisplayIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setDisplayIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-3">
      <section className="relative pt-20 pb-10 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Find Your Favorite
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Movies
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Watch your favorite movies from our vast collection of thousands of
            films
          </p>
        </div>
      </section>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 px-4">
        {getCurrentMovies().map((movie) => (
          <MovieCard key={movie.imdbID || movie._id} movie={movie} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6 mb-12">
        {displayIndex > 0 && (
          <button
            onClick={handlePrev}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            See Previous
          </button>
        )}
        {movies.length >
          (displayIndex === 0
            ? firstPageSize
            : firstPageSize + displayIndex * otherPageSize) && (
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
