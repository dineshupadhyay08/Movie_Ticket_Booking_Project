import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, PlayCircleIcon, StarIcon } from "lucide-react";
import { toast } from "react-toastify";

import BlurCircle from "../components/BlurCircle";
import DateSection from "../components/DateSection";
import Loading from "../components/Loading";
import MovieCard from "../components/MovieCard";
import timeFormat from "../lib/timeFormat";
import { useAppContext } from "../context/AppContext";

const MoviesDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    shows = [],
    axios,
    getToken,
    user,
    fetchFavoriteMovies,
    favoriteMovies = [],
    image_base_url = "",
  } = useAppContext();

  useEffect(() => {
    const controller = new AbortController();

    const loadShow = async () => {
      setIsLoading(true);
      setError("");
      setShow(null);

      try {
        const { data } = await axios.get(`/api/shows/${id}`, {
          signal: controller.signal,
        });

        // Backend returns { success, movie, dateTime }, not data.show.
        if (!data.success || !data.movie) {
          throw new Error(data.message || "Movie details could not be found.");
        }

        setShow({
          movie: data.movie,
          dateTime: data.dateTime || {},
        });
      } catch (err) {
        if (err.code !== "ERR_CANCELED") {
          console.error("Failed to load movie details:", err);
          setError(err.response?.data?.message || err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadShow();

    return () => controller.abort();
  }, [id, axios]);

  const scrollToDateSection = () => {
    document.getElementById("dateSelect")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleFavorite = async () => {
    if (!user) {
      toast.error("Please log in to continue.");
      return;
    }

    try {
      const token = await getToken();

      const { data } = await axios.post(
        "/api/user/update-favorite",
        { movieId: id },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (!data.success) {
        throw new Error(data.message || "Could not update favorites.");
      }

      await fetchFavoriteMovies();
      toast.success(data.message);
    } catch (err) {
      console.error("Failed to update favorite:", err);
      toast.error(err.response?.data?.message || err.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error || !show) {
    return (
      <div className="px-6 pt-40 text-center">
        <p className="text-red-400">{error || "Movie not found."}</p>
        <button
          type="button"
          onClick={() => navigate("/movies")}
          className="mt-5 rounded-md bg-primary px-5 py-2"
        >
          Back to movies
        </button>
      </div>
    );
  }

  const { movie, dateTime } = show;
  const casts = Array.isArray(movie.casts) ? movie.casts : [];
  const genres = Array.isArray(movie.genres) ? movie.genres : [];
  const rating = Number(movie.vote_average);
  const isFavorite = favoriteMovies.some(
    (favorite) => String(favorite?._id) === String(id),
  );

  // `shows` is the context array. `show` is the selected movie-details object.
  const relatedMovies = shows
    .filter((item) => String(item?._id) !== String(id))
    .slice(0, 6);

  return (
    <div className="px-6 pt-30 md:px-16 md:pt-50 lg:px-40">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row">
        <img
          src={`${image_base_url}${movie.poster_path || ""}`}
          alt={`${movie.title || "Movie"} poster`}
          className="max-md:mx-auto h-104 max-w-70 rounded-xl object-cover"
        />

        <div className="relative flex flex-col gap-3">
          <BlurCircle top="-100px" left="-100px" />

          <p className="text-primary">
            {(movie.original_language || "English").toUpperCase()}
          </p>

          <h1 className="max-w-96 text-4xl font-semibold text-balance">
            {movie.title}
          </h1>

          <div className="flex items-center gap-2 text-gray-300">
            <StarIcon className="h-5 w-5 fill-primary text-primary" />
            {Number.isFinite(rating) ? rating.toFixed(1) : "N/A"} User Rating
          </div>

          <p className="mt-2 max-w-xl text-sm leading-tight text-gray-400">
            {movie.overview || "No description available."}
          </p>

          <p>
            {Number.isFinite(Number(movie.runtime))
              ? timeFormat(movie.runtime)
              : "Runtime unavailable"}
            {" • "}
            {genres
              .map((genre) => genre?.name)
              .filter(Boolean)
              .join(", ") || "Genre unavailable"}
            {" • "}
            {movie.release_date?.split("-")[0] || "Release date unavailable"}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <button type="button" className="rounded-md bg-gray-800 px-6 py-3">
              <PlayCircleIcon className="mr-2 inline h-5 w-5" />
              Watch Trailer
            </button>

            <button
              type="button"
              onClick={scrollToDateSection}
              className="rounded-md bg-primary px-10 py-3"
            >
              Buy Tickets
            </button>

            <button
              type="button"
              onClick={handleFavorite}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
              className="rounded-full bg-gray-700 p-2.5"
            >
              <Heart
                className={`h-5 w-5 ${
                  isFavorite ? "fill-primary text-primary" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <p className="mt-10">Your Favorite Cast</p>

      <div className="no-scrollbar mt-8 overflow-x-auto pb-4">
        <div className="flex w-max items-center gap-4 px-4">
          {casts.slice(0, 12).map((cast) => (
            <div key={cast.id || cast.name}>
              <img
                src={`${image_base_url}${cast.profile_path || ""}`}
                alt={cast.name || "Cast member"}
                className="aspect-square h-20 rounded-full object-cover"
              />
              <p className="mt-3 text-xs font-medium">{cast.name}</p>
            </div>
          ))}
        </div>
      </div>

      <DateSection dateTime={dateTime} id={id} />

      <p className="mb-8 mt-20 text-lg font-medium">You May Also Like</p>
      <div className="flex flex-wrap gap-8 max-sm:justify-center">
        {relatedMovies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>

      <div className="mt-20 flex justify-center">
        <button
          type="button"
          onClick={() => {
            navigate("/movies");
            window.scrollTo(0, 0);
          }}
          className="rounded-md bg-primary px-10 py-3"
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default MoviesDetails;
