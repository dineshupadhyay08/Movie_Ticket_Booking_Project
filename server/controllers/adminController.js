import Booking from "../models/Booking.js";
import Movie from "../models/Movies.js";
import Show from "../models/Show.js";
import User from "../models/User.js";

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

export const isAdmin = async (req, res) => {
  res.json({ success: true, isAdmin: true });
};

export const getDashboardData = async (req, res) => {
  try {
    const bookings = await Booking.find({ isPaid: true }).lean();
    const activeShowsRaw = await Show.find({
      showDateTime: { $gte: new Date() },
    })
      .sort({ showDateTime: 1 })
      .lean();

    const activeShows = await attachMoviesToShows(activeShowsRaw);
    const totalUser = await User.countDocuments();

    const dashboardData = {
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
      activeShows: activeShows.filter((show) => show.movie),
      totalUser,
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllShows = async (req, res) => {
  try {
    const showsRaw = await Show.find({
      showDateTime: { $gte: new Date() },
    })
      .sort({ showDateTime: 1 })
      .lean();

    const shows = await attachMoviesToShows(showsRaw);

    res.json({
      success: true,
      shows: shows.filter((show) => show.movie),
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookingsRaw = await Booking.find({})
      .sort({ createdAt: -1 })
      .populate("user", "name email image")
      .populate({
        path: "show",
        populate: {
          path: "movies",
        },
      })
      .lean();

    const bookings = bookingsRaw.map((booking) => ({
      ...booking,
      show: booking.show
        ? {
            ...booking.show,
            movie: booking.show.movies || null,
          }
        : null,
    }));

    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
