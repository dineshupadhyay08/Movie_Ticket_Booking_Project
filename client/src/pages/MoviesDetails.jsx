import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'

const MoviesDetails = () => {
  const {id} = useParams()
  const [show, setShow] = useState(null)

  const getShow = async () => {
    const show = dummyShowsData.find(show => show._id === id)
    setShow({
      movie: show,
      dateTime: dummyDateTimeData
    })
  }

  useEffect(() => {
    getShow()
  }, [id])

  return show ? (
    <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>
      <div>
        <img src={show.movie.poster_path} alt='' className=''/>
      </div>
    </div>
  ) :  <div>Loading...</div>
}

export default MoviesDetails
