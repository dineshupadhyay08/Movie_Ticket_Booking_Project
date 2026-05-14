import React, { useState } from 'react'
import { dummyShowsData } from '../../assets/assets'

const ListShows = () => {

  const currency = import.meta.env.VITE_CURRENCY

  const [show,setShow] = useState([])
  const [loading,setLoading] = useState(true)

  const getAllShow = async () =>{
    try {
      setShow([{
        movie: dummyShowsData[0],
        showDateTime: "2025-06-30T02:30:00.000Z",
        showPrice: 59,
        occupiedSeats: {
          A1: "user_1",
          B1: "user_2",
          C1: "user_3"
        }
      }])
    }
  }


  return (
    <div>
      
    </div>
  )
}

export default ListShows
