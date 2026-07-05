import axios from "axios";
import Movie from "../models/Movies.js";
import Show from "../models/Show.js";

export const getNowPlayigMovies = async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing",
      {
        headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
      },
    );

    const movies = data.results;
    res.json({ success: true, movies: movies });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Failed to fetch now playing movies" });
  }
};

export const addShow = async (req, res) => {
  try {
    const { moviesId, showsInput, showPrice } = req.body;

    if (!moviesId) {
      return res.json({
        success: false,
        message: "Movie id is required.",
      });
    }

    if (!Array.isArray(showsInput) || showsInput.length === 0) {
      return res.json({
        success: false,
        message: "At least one show date and time is required.",
      });
    }

    if (!showPrice || Number(showPrice) <= 0) {
      return res.json({
        success: false,
        message: "A valid show price is required.",
      });
    }

    let movie = await Movie.findById(moviesId);
    if (!movie) {
      const [movieDetailsResponse, moviesCreditsResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${moviesId}`, {
          headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
        }),
        axios.get(`https://api.themoviedb.org/3/movie/${moviesId}/credits`, {
          headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
        }),
      ]);
      const movieApiData = movieDetailsResponse.data;
      const moviesCreditsData = moviesCreditsResponse.data;

      const movieDetails = {
        _id: moviesId,
        title: movieApiData.title,
        overview: movieApiData.overview,
        poster_path: movieApiData.poster_path,
        backdrop_path: movieApiData.backdrop_path,
        genres: movieApiData.genres,
        casts: moviesCreditsData.cast,
        release_date: movieApiData.release_date,
        original_language: movieApiData.original_language,
        tagline: movieApiData.tagline || "",
        vote_average: movieApiData.vote_average,
        runtime: movieApiData.runtime,
      };

      movie = await Movie.create(movieDetails);
    }

    const showToCreate = [];
    showsInput.forEach((show) => {
      const showDate = show.date;
      show.time.forEach((time) => {
        const dateTimeString = `${showDate}T${time}`;
        showToCreate.push({
          movies: moviesId,
          showDateTime: new Date(dateTimeString),
          showPrice,
          occupiedSeats: {},
        });
      });
    });

    if (showToCreate.length === 0) {
      return res.json({
        success: false,
        message: "No valid show times were provided.",
      });
    }

    await Show.insertMany(showToCreate);
    res.json({
      success: true,
      message: "Shows added successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getShows = async (req, res) => {
  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const shows = await Show.find({
      showDateTime: { $gte: today },
    });

    const movieIds = [...new Set(shows.map((show) => show.movies))];

    const movies = await Movie.find({
      _id: { $in: movieIds },
    });

    res.json({
      success: true,
      shows: movies,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getShow = async (req, res) => {
  try {
    const { movieId } = req.params;

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const shows = await Show.find({
      movies: movieId,
      showDateTime: { $gte: today },
    }).sort({ showDateTime: 1 });

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.json({
        success: false,
        message: "Movie not found",
      });
    }

    const dateTime = {};

    shows.forEach((show) => {
      const date = show.showDateTime.toISOString().split("T")[0];

      if (!dateTime[date]) {
        dateTime[date] = [];
      }

      dateTime[date].push({
        time: show.showDateTime,
        showId: show._id,
      });
    });

    res.json({
      success: true,
      movie,
      dateTime,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
