import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hook/useAxios";
import useAuth from "../Hook/useAuth";
import MovieCard from "./MovieCard";

const Favorites = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const {
    data: favorites = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["favorites", user?.email],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get("/favorites");
      return res.data;
    },
  });
  const handleDelete = async (id) => {
    const res = await axiosSecure.delete(`/favorites/${id}`);
    refetch();
    return res.data;
  };
  if (isLoading) return <p>Loading favorites...</p>;
  if (error) return <p> Error loading favorites: {error.message}</p>;

  if (!Array.isArray(favorites)) {
    return <p> Unexpected favorites data format</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Favorites</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {favorites.length === 0 ? (
          <p>No favorites found.</p>
        ) : (
          favorites.map((movie) =>
            movie && movie.Poster && movie.Title && movie.imdbID ? (
              <div
                key={movie._id || movie.imdbID}
                className="bg-white shadow rounded p-2"
              >
                <img
                  src={
                    movie.Poster && movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/200x300?text=No+Image"
                  }
                  alt={movie.Title}
                  className="w-full object-cover h-64"
                />
                <h3 className="text-sm mt-2 font-medium">{movie.Title}</h3>
                {user && (
                  <button
                    onClick={() => handleDelete(movie._id)}
                    className="text-sm text-blue-500 mt-1 hover:underline"
                  >
                    Delete
                  </button>
                )}
              </div>
            ) : (
              <div key={movie?._id || Math.random()} className="text-red-600">
                ⚠️ Invalid movie data
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default Favorites;
