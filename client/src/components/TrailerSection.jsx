import React, { useState } from 'react'
import { dummyTrailers } from '../assets/assets'
import ReactPlayer from 'react-player'
import BlurCircle from './BlurCircle'

const TrailerSection = () => {
  const [currentTrailer] = useState(dummyTrailers[0])

  return (
    <section className='px-6 py-20 md:px-16 lg:px-24 xl:px-44'>
      <p className='mx-auto text-lg font-medium text-gray-300'>
        Trailers
      </p>

        <BlurCircle top='-100' right='50px' />
      <div className='relative mx-auto mt-6 w-full  overflow-hidden rounded-2xl'>

        <div className='aspect-video w-full'>
          <ReactPlayer
            src={currentTrailer.videoUrl}
            controls
            playsInline
            width='100%'
            height='100%'
            className='mx-auto max-w-full'
          />
        </div>
      </div>
    </section>
  )
}

export default TrailerSection
