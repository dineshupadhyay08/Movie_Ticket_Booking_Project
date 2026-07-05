import React, { useEffect, useState } from 'react'
// import { dummyShowsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/Admin/Title';
import { FaStar } from "react-icons/fa";
import { kConverter } from '../../lib/kConverter';
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useAppContext } from '../../context/AppContext';
import { toast } from "react-toastify";

const AddShows = () => {

  const {axios,getToken, user} = useAppContext()


  const currency = import.meta.env.VITE_CURRENCY
  const [nowPlayingMovies,setNowPlayingMovies] = useState([]);
  const [selectedMovie,setSelectedMovie] = useState(null);
  const [dateTimeSelection,setDateTimeSelection] = useState({});
  const [dateTimeInput,setDateTimeInput] = useState("");
  const [showPrice,setShowPrice] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getPosterUrl = (path) =>
    path?.startsWith("http") ? path : `https://image.tmdb.org/t/p/w500${path}`;

  const fetchNowPlayingMovies = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const token = await getToken();
      if (!token) {
        throw new Error("Authentication token is not available yet.");
      }

      const { data } = await axios.get("/api/shows/now-playing", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setNowPlayingMovies(data.movies);
      } else {
        setNowPlayingMovies([]);
        setErrorMessage(data.message || "Failed to load now playing movies.");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setNowPlayingMovies([]);
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to load now playing movies.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateTimeSelection =() =>{
    if(!dateTimeInput) return;
    const [date,time] = dateTimeInput.split("T");
    if(!date || !time) return;

    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if(!times.includes(time)){
        return {...prev,[date]: [...times,time]}
      }
      return prev;
    })
    setDateTimeInput("");
  }

  const handleRemoveTime = (date, time)=>{
    setDateTimeSelection((prev) =>{
      const filteredTimes = prev[date].filter((t) => t !== time);
      if(filteredTimes.length === 0){
        const { [date]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [date]: filteredTimes,
      }
    })
  }

  const handleAddShow = async () => {
    if (!selectedMovie) {
      toast.error("Please select a movie.");
      return;
    }

    if (!showPrice || Number(showPrice) <= 0) {
      toast.error("Please enter a valid show price.");
      return;
    }

    if (Object.keys(dateTimeSelection).length === 0) {
      toast.error("Please add at least one show time.");
      return;
    }

    try {
      setIsSubmitting(true);
      const token = await getToken();

      if (!token) {
        throw new Error("Authentication token is not available yet.");
      }

      const showsInput = Object.entries(dateTimeSelection).map(([date, time]) => ({
        date,
        time,
      }));

      const { data } = await axios.post(
        "/api/shows/add",
        {
          moviesId: selectedMovie,
          showsInput,
          showPrice: Number(showPrice),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!data.success) {
        throw new Error(data.message || "Failed to add show.");
      }

      toast.success(data.message || "Shows added successfully.");
      setSelectedMovie(null);
      setDateTimeSelection({});
      setDateTimeInput("");
      setShowPrice("");
      fetchNowPlayingMovies();
    } catch (error) {
      console.error("Error adding show:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to add show.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(()=>{
    if (user) {
      fetchNowPlayingMovies();
    } else {
      setIsLoading(false);
    }
  },[user]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Title text1="Add" text2="Shows" />
      <p className="mt-10 text-lg font-medium">Now Playing Movies</p>
      {errorMessage ? (
        <div className="mt-4 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {errorMessage}
        </div>
      ) : nowPlayingMovies.length > 0 ? (
        <div className="overflow-x-auto pb-4 ">
          <div className="group flex flex-wrap gap-4">
            {nowPlayingMovies.map((movie) => (
              <div
                key={movie.id}
                className={`relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 translate-y-1 transition duration-300`}
                onClick={() => setSelectedMovie(movie.id)}
              >
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={getPosterUrl(movie.poster_path)}
                    alt={movie.title}
                    className="w-full object-cover brightness-90"
                  />
                  <div className="text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0">
                    <p className="flex items-center gap-1 text-gray-400">
                      <FaStar className="w-4 h-4 text-primary fill-primary" />
                      {movie.vote_average.toFixed(1)}
                    </p>
                    <p>{kConverter(movie.vote_count)} Votes</p>
                  </div>
                </div>
                {selectedMovie === movie.id && (
                  <div className="absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded">
                    <FaCheck className="w-3 h-3 text-white" strokeWidth={2.5} />
                  </div>
                )}
                <p className="font-medium truncate">{movie.title}</p>
                <p className="text-gray-400 text-sm">{movie.release_date}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">
          No now playing movies were returned by the backend.
        </div>
      )}
      <div className="mt-8">
        <label className="block text-sm font-medium mb-2">Show Price</label>
        <div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md">
          <p className="text-gray-400 text-sm">{currency}</p>
          <input
            type="number"
            className="outline-none"
            min={0}
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            placeholder="Enter show price"
          />
        </div>
      </div>
      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">
          Select Date and Time
        </label>
        <div className="inline-flex gap-5 border border-r-gray-600 p-1 pl-3 rounded-lg">
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="outline-none rounded-md"
          />
          <button
            onClick={handleDateTimeSelection}
            className="bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer"
          >
            Add Time
          </button>
        </div>
      </div>

      {Object.keys(dateTimeSelection).length > 0 && (
        <div className="mt-6">
          <h2 className="mb-2">Selected Date-Time</h2>
          <ul className="space-y-3">
            {Object.entries(dateTimeSelection).map(([date, times]) => (
              <li key={date}>
                <div className="font-medium">{date}</div>
                <div className="flex flex-wrap gap-2 mt-1 text-sm">
                  {times.map((time) => (
                    <div
                      key={time}
                      className="border border-primary px-2 py-1 flex items-center rounded"
                    >
                      <span>{time}</span>
                      <MdDelete
                        onClick={() => handleRemoveTime(date, time)}
                        width={15}
                        className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        onClick={handleAddShow}
        disabled={isSubmitting}
        className='bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-60'
      >
        {isSubmitting ? "Adding..." : "Add Show"}
      </button>
    </>
  );
}

export default AddShows
