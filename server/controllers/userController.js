import { clerkClient } from "@clerk/express";
import Booking from "../models/Booking.js";
import Movie from "../models/Movies.js";
import Show from "../models/Show.js";

const attachMoviesToShows = async (shows) => {
  const movieIds = [...new Set(shows.map((show) => show.movies).filter(Boolean))];

  if (movieIds.length === 0) {
    return shows.map((show) => ({ ...show, movie: null }));
  }

  const movies = await Movie.find({ _id: { $in: movieIds } }).lean();
  const movieMap = new Map(movies.map((movie) => [movie._id, movie]));

  return shows.map((show) => ({
    ...show,
    movie: movieMap.get(show.movies) || null,
  }));
};

export const getUserBookings = async (req, res) => {
  try {
    const userId = req.auth().userId;

    const bookingsRaw = await Booking.find({ user: userId })
      .sort({ createdAt: -1 })
      .lean();

    const showIds = [...new Set(bookingsRaw.map((booking) => booking.show).filter(Boolean))];
    const showsRaw = await Show.find({ _id: { $in: showIds } }).lean();
    const shows = await attachMoviesToShows(showsRaw);
    const showMap = new Map(shows.map((show) => [String(show._id), show]));

    const bookings = bookingsRaw.map((booking) => ({
      ...booking,
      show: showMap.get(booking.show) || null,
    }));

    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const updateFavoritMovies = async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.auth().userId;

    const user = await clerkClient.users.getUser(userId);
    const favorites = Array.isArray(user.privateMetadata.favorites)
      ? [...user.privateMetadata.favorites]
      : [];

    const updatedFavorites = favorites.includes(movieId)
      ? favorites.filter((item) => item !== movieId)
      : [...favorites, movieId];

    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        ...user.privateMetadata,
        favorites: updatedFavorites,
      },
    });

    res.json({ success: true, message: "Favorite updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const getFavorite = async (req, res) => {
  try {
    const user = await clerkClient.users.getUser(req.auth().userId);
    const favorites = Array.isArray(user.privateMetadata.favorites)
      ? user.privateMetadata.favorites
      : [];

    const movies = await Movie.find({ _id: { $in: favorites } }).lean();
    res.json({ success: true, movies });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};
