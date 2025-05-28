import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const MovieDetail = () => {
  const { state } = useLocation();

  const navigate = useNavigate();
  const movie = state?.movie;

  if (!movie) return <p> Movie data not found!</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          variant="outline"
          className="mb-6 border-white/30 p-3 text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>

        <div className="bg-white/5 backdrop-blur-md border-white/10 rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              {movie.videoUrl ? (
                <video
                  src={movie.videoUrl}
                  controls
                  autoPlay
                  muted
                  className="w-full h-[400px] object-cover"
                />
              ) : (
                <img
                  src={
                    movie.Poster && movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/400x300?text=No+Image"
                  }
                  alt={movie.Title}
                  className="w-full h-[400px] object-cover"
                />
              )}
            </div>

            <div className="md:w-2/3 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                {movie.Title}
              </h2>
              <p className="text-gray-300 mb-4">
                A great movie that will enrich your viewing experience.
              </p>
              <div className="space-y-2 text-gray-300">
                <p>
                  <span className="font-semibold">Genre:</span> Action, Drama
                </p>
                <p>
                  <span className="font-semibold">Year:</span> 2024
                </p>
                <p>
                  <span className="font-semibold">Rating:</span> 8.5/10
                </p>
                <p>
                  <span className="font-semibold">Language:</span> English
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
