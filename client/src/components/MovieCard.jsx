import React from 'react'
import { StarIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const MovieCard = ({ movie }) => {
  const navigate = useNavigate()

  return (
    <div className="flex w-66 flex-col justify-between rounded-2xl bg-gray-800 p-3 transition duration-300 hover:-translate-y-1">
      <img
        onClick={() => {
          navigate(`/movies/${movie._id}`)
          scrollTo(0, 0)
        }}
        src={movie.backdrop_path}
        className="h-52 w-full cursor-pointer rounded-lg object-cover object-right-bottom"
      />
      <p className="mt-2 truncate font-semibold">{movie.title}</p>
      <p className="mt-2 text-sm text-gray-400">
        {new Date(movie.release_date).getFullYear()} {" • "}
        {movie.genres
          .slice(0, 2)
          .map((genre) => genre.name)
          .join(" | ")}{" "}
        {" • "} {movie.runtime}
      </p>
      <div className='mt-4 flex items-center justify-between pb-3'>
        <button
          onClick={() => {
            navigate(`/movies/${movie._id}`)
            scrollTo(0, 0)
          }}
          className='cursor-pointer rounded-full bg-primary px-4 py-2 text-xs font-medium transition hover:bg-primary-dull'
        >
          Buy Tickets
        </button>
        <p className='mt-1 flex items-center gap-1 pr-1 text-sm text-gray-400'>
          <StarIcon className='h-4 w-4 fill-primary text-primary' />
          {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  )
}

export default MovieCard
