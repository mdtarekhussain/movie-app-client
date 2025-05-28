import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hook/useAxios";
import useAuth from "../Hook/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Favorites = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const navigate = useNavigate();

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
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.delete(`/favorites/${id}`);
      await refetch();
      Swal.fire("Deleted!", "Your favorite has been deleted.", "success");
      return res.data;
    }
  };

  const handleMovieClick = (movie) => {
    if (!movie?.imdbID) return;
    navigate(`/movie/${movie.imdbID}`, { state: { movie } });
  };

  if (isLoading) return <p>Loading favorites...</p>;
  if (error) return <p>Error loading favorites: {error.message}</p>;

  if (!Array.isArray(favorites)) {
    return <p>Unexpected favorites data format</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-3">
      <h2 className="text-xl font-semibold mb-4 text-white mt-[100px]">
        Your Favorites
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {favorites.length === 0 ? (
          <p className="text-white">No favorites found.</p>
        ) : (
          favorites.map((movie) =>
            movie && movie.Poster && movie.Title && movie.imdbID ? (
              <div
                key={movie._id || movie.imdbID}
                className="bg-white shadow rounded p-2 cursor-pointer hover:shadow-lg transition"
                onClick={() => handleMovieClick(movie)} // ✅ মুভিতে ক্লিক করলে যাবে
              >
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/200x300?text=No+Image"
                  }
                  alt={movie.Title}
                  className="w-full object-cover h-64"
                />
                <h3 className="text-sm mt-2 font-medium">{movie.Title}</h3>
                {user && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // ❌ মুভি কার্ডে ক্লিক আটকায়
                      handleDelete(movie._id);
                    }}
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
