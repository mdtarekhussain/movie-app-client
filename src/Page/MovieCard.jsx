import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import useAxios from "../Hook/useAxios";
import { useRef } from "react";

const fallbackImage = "https://via.placeholder.com/400x300?text=No+Image";

const MovieCard = ({ movie }) => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const imgRef = useRef();

  const { mutate: addFavorite } = useMutation({
    mutationFn: async () => {
      return await axiosSecure.post("/api/favorites", {
        imdbID: movie.imdbID,
        Title: movie.Title,
        Poster: movie.Poster,
        videoUrl: movie.videoUrl,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["favorites", user?.email]);
      alert("✅ Movie added to favorites!");
    },
    onError: () => {
      alert("❌ Failed to add movie to favorites.");
    },
  });

  const handleAddFavorite = (e) => {
    e.stopPropagation();
    if (!user) {
      navigate("/login");
      return;
    }
    addFavorite();
  };

  const handleMovieClick = () => {
    if (!movie?.imdbID) return;
    navigate(`/movie/${movie.imdbID}`, { state: { movie } });
  };

  const handleImageError = () => {
    if (imgRef.current) {
      imgRef.current.src = fallbackImage;
    }
  };

  if (!movie) {
    return (
      <div className="bg-gray-100 text-center p-8 rounded shadow">
        <p className="text-gray-500 text-xl">Movie not found ❗</p>
      </div>
    );
  }

  return (
    <div
      onClick={handleMovieClick}
      className="bg-white shadow hover:shadow-lg transition p-4 rounded-lg cursor-pointer"
    >
      {movie.videoUrl ? (
        <video
          src={movie.videoUrl}
          controls
          autoPlay
          muted
          className="w-full h-[400px] object-cover rounded"
        />
      ) : (
        <img
          ref={imgRef}
          src={
            movie.Poster && movie.Poster !== "N/A"
              ? movie.Poster
              : fallbackImage
          }
          onError={handleImageError}
          alt={movie.Title || "Untitled"}
          className="w-full h-[400px] object-cover rounded"
        />
      )}

      <h3 className="text-lg font-semibold mt-2">
        {movie.Title || "Untitled Movie"}
      </h3>
      <button
        onClick={handleAddFavorite}
        className="text-blue-600 hover:underline mt-1 text-sm"
      >
        ➕ Add to Favorite
      </button>
    </div>
  );
};

export default MovieCard;
