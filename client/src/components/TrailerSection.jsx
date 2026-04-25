import React, { useState } from 'react'
import { dummyTrailers } from '../assets/assets'
import ReactPlayer from 'react-player'
import BlurCircle from './BlurCircle'
import { PlayCircle } from "lucide-react";

const TrailerSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  return (
    <section className="px-6 py-20 md:px-16 lg:px-24 xl:px-44">
      <p className="mx-auto text-lg font-medium text-gray-300">Trailers</p>

      <BlurCircle top="-100" right="50px" />
      <div className="relative mx-auto mt-6 w-full  overflow-hidden rounded-2xl">
        <div className="aspect-video w-full">
          <ReactPlayer
            src={currentTrailer.videoUrl}
            controls
            playsInline
            width="100%"
            height="100%"
            className="mx-auto max-w-full"
          />
        </div>
        <div className="group grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto">
          {dummyTrailers.map((trailer) => (
            <div
              key={trailer.image}
              className="relative group-hover:not-hover:opacity-50 hover:-translate-y-1 duration-300 transition max-md:h-60 md:max-h-60 cursor-pointer
            "
              onClick={() => setCurrentTrailer(trailer)}
            >
              <img
                src={trailer.image}
                alt="trailer"
                className="rounded-lg w-full h-full object-cover brightness-75"
              />
              <PlayCircle
                strokeWidth={1.6}
                className="absolute top-1/2 left-1/2 w-5 md:w-8 h-5 mg:h-12 transform -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrailerSection
