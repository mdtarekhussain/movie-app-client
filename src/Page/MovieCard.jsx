import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../Hook/useAuth";
import useAxios from "../Hook/useAxios";

const MovieCard = ({ movie }) => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  const { mutate: addFavorite } = useMutation({
    mutationFn: async () => {
      return await await axiosSecure.post("/api/favorites", {
        imdbID: movie.imdbID,
        Title: movie.Title,
        Poster: movie.Poster,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["favorites", user?.email]);
      alert("✅ Added to favorites!");
    },
    onError: () => {
      alert("❌ Failed to add to favorites!");
    },
  });

  if (!movie) {
    return <div>⚠️ Movie not found</div>;
  }

  return (
    <div className="bg-white shadow rounded p-2">
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
          onClick={() => addFavorite()}
          className="text-sm text-blue-500 mt-1 hover:underline"
        >
          ❤️ Add to Favorite
        </button>
      )}
    </div>
  );
};

export default MovieCard;
