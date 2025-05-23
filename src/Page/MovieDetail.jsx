import { useLocation } from "react-router-dom";

const MovieDetail = () => {
  const { state } = useLocation();
  const movie = state?.movie;

  if (!movie) return <p> Movie data not found!</p>;

  return (
    <div className="p-4 ">
      <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>

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
          src={
            movie.Poster && movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/400x300?text=No+Image"
          }
          alt={movie.Title}
          className="w-full object-cover h-[400px]"
        />
      )}
      <button
        onClick={() => window.history.back()}
        className="mb-4 text-blue-500 mt-3 underline"
      >
        ← Back
      </button>
    </div>
  );
};

export default MovieDetail;
