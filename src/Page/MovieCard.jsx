import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import useAxios from "../Hook/useAxios";
import { useRef } from "react";
import { Badge, Heart, Play, Star } from "lucide-react";
import Swal from "sweetalert2";

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
      Swal.fire({
        icon: "success",
        title: "Your movie is  saved",
        showConfirmButton: false,
        timer: 1500,
      });
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
      className="group cursor-pointer overflow-hidden bg-white/5 backdrop-blur-md border-white/10 hover:scale-105 transition-all duration-300 hover:shadow-2xl p-2 "
    >
      <div className="relative overflow-hidden">
        {movie.videoUrl ? (
          <video
            src={movie.videoUrl}
            controls
            autoPlay
            muted
            className="w-full h-[300px] object-cover"
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
            className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
          />
        )}

        {/* Overlay */}
        <div className="flex absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className=" absolute bottom-4 left-4 right-4">
            <button
              onClick={handleAddFavorite}
              variant="secondary"
              size="sm"
              className="w-full py-2 rounded-[15px] justify-center items-center flex bg-white/20 backdrop-blur-md text-white border-white/30 hover:bg-white/30"
            >
              <Heart className="h-4 w-4 mr-2" />
              Add to Favorites
            </button>
          </div>
        </div>

        {/* Play Icon */}
        <div
          className="flex absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent 
  opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="absolute bottom-4 left-4 right-4">
            <button
              onClick={handleAddFavorite}
              className="w-full py-2 rounded-[15px] flex justify-center items-center bg-white/20 backdrop-blur-md text-white border-white/30 hover:bg-white/30"
            >
              <Heart className="h-4 w-4 mr-2" />
              Add to Favorites
            </button>
          </div>
        </div>

        {/* Rating Badge */}
        <Badge className="absolute top-3 right-3 bg-yellow-500/90 text-black">
          <Star className="h-3 w-3 mr-1" />
          8.5
        </Badge>
      </div>
    </div>
  );
};

export default MovieCard;
