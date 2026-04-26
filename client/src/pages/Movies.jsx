import React from 'react'
import { dummyShowsData } from "../assets/assets.js";
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle.jsx';

const Movies = () => {
  return dummyShowsData.length > 0 ? (
    <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[8vh]'>
      <BlurCircle top='150px' left='0'/>
      <BlurCircle bottom='50px' right='50'/>
      <h1 className='text-lg font-medium my-4'>Now Showing</h1>
      <div className='flex flex-wrap max-sm:justify-center gap-8'>
        {dummyShowsData.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  ) : (
    <div>

    </div>
  )
}

export default Movies
