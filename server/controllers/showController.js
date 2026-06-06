import axios from "axios";
import Movie from "../models/Movies.js";
import Show from "../models/Show.js";


export const getNowPlayigMovies = async(req,res)=>{
  try{
    const {data} = await axios.get('https://api.themoviedb.org/3/movie/now_playing',{
      headers: {Authorization: `Bearer ${process.env.TMDB_API_KEY}`}
    })
    
    const movies = data.results;
    res.json({success: true, movies: movies})
    
  }catch (error) {
    console.log(error.message)
    res.json({success: false,
      message: 'Failed to fetch now playing movies',
    })
  }
}

export const addShow = async(req,res)=>{
  try {
    const { moviesId, showsInput, showPrice } = req.body;
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

    if (showToCreate.length > 0) {
      await Show.insertMany(showToCreate);
      res.json({
        success: true,
        message: "Shows added successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
}