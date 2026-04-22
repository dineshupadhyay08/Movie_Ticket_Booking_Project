import { ArrowRightIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { dummyShowsData } from '../assets/assets'
import BlurCircle from './BlurCircle'
import MovieCard from './MovieCard'

const FeaturedSection = () => {
  const navigate = useNavigate()

  return (
    <div className='overflow-hidden px-6 md:px-16 lg:px-24 xl:px-44'>
      <div className='relative flex items-center justify-between pt-20 pb-10'>
        <BlurCircle top='0' right='-80px' />
        <p className='text-lg font-medium text-gray-300'>Now Showing</p>
        <button className='group flex items-center gap-2 text-sm text-gray-300'>
          View All
          <ArrowRightIcon className='h-4.5 w-4.5 transition group-hover:translate-x-0.5' />
        </button>
      </div>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {dummyShowsData.slice(0, 4).map((show) => (
          <MovieCard key={show._id} movie={show} />
        ))}
      </div>
      <div className='mt-20 flex justify-center'>
        <button
          onClick={() => {
            navigate('/movies')
            scrollTo(0, 0)
          }}
          className='cursor-pointer rounded-md bg-primary px-10 py-3 text-sm font-medium transition hover:bg-primary-dull'
        >
          Show more
        </button>
      </div>
    </div>
  )
}

export default FeaturedSection
