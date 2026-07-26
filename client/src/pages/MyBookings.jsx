import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import BlurCircle from "../components/BlurCircle";
import { dateFormat } from "../lib/dateFormat";
import { useAppContext } from "../context/AppContext";

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [booking, setBooking] = useState([]);
  const [isLoding, setIsLoding] = useState(true);
  const [error, setError] = useState("");

  const { axios, getToken, user, image_base_url } = useAppContext();

  const getMyBooking = async () => {
    try {
      setError("");

      const { data } = await axios.get("/api/user/bookings", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setBooking(Array.isArray(data.bookings) ? data.bookings : []);
      } else {
        setBooking([]);
        setError(data.message || "Failed to load bookings");
      }
    } catch (error) {
      console.log(error);
      setBooking([]);
      setError(error.response?.data?.message || "Failed to load bookings");
    } finally {
      setIsLoding(false);
    }
  };

  useEffect(() => {
    if (user) {
      getMyBooking();
    } else {
      setBooking([]);
      setIsLoding(false);
    }
  }, [user]);

  return isLoding ? (
    <Loading />
  ) : (
    <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]">
      <BlurCircle top="0px" left="100px" />
      <div>
        <BlurCircle bottom="0px" left="600px" />
      </div>

      <h1 className="text-lg font-semibold mb-4">My Booking</h1>

      {error ? (
        <p className="text-red-400">{error}</p>
      ) : booking.length === 0 ? (
        <p className="text-gray-400">No bookings found.</p>
      ) : (
        booking.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-3 bg-primary/8 border border-primary/20 rounded-md mt-3 p-2 w-full max-w-2xl"
          >
            <img
              src={image_base_url + (item.show?.movie?.poster_path || "")}
              alt={item.show?.movie?.title || "Movie poster"}
              className="w-20 h-28 object-cover rounded"
            />

            <div className="flex flex-col whitespace-nowrap">
              <p className="text-sm font-semibold">
                {item.show?.movie?.title || "Movie unavailable"}
              </p>

              <p className="text-gray-400 text-xs">
                {item.show?.movie?.runtime || "N/A"}
              </p>

              <p className="text-gray-400 text-xs mt-3">
                {item.show?.showDateTime
                  ? dateFormat(item.show.showDateTime)
                  : "Show time unavailable"}
              </p>
            </div>

            <div className="flex flex-col md:items-end md:text-right justify-between w-full p-4">
              <div className="flex items-center gap-4">
                <p className="text-2xl font-semibold mb-3">
                  {currency}
                  {item.amount || 0}
                </p>

                {!item.isPaid && (
                  <button className="bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer">
                    Pay now
                  </button>
                )}
              </div>

              <div className="text-sm">
                <p className="text-gray-400">
                  <span>Total Tickets: </span>
                  {item.bookedSeats?.length || 0}
                </p>

                <p className="text-gray-400">
                  <span>Seat Number: </span>
                  {(item.bookedSeats || []).join(", ")}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookings;
