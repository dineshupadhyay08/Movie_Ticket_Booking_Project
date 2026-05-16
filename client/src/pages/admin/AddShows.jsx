import React, { useState } from 'react'

const AddShows = () => {
  const currency = import.meta.env.VITE_CURRENCY
  const [nowPlayingMovies,setNowPlayingMovies] = useState([]);
  const [selectedMovie,setSelectedMovie] = useState(null);
  const [dateTimeSelection,setDateTimeSelection] = useState({});
  const [dateTimeInput,setDateTimeInput] = useState("");
  const [showPrice,setShowPrice] = useState("");
  
  return (
    <div>
      
    </div>
  )
}

export default AddShows
