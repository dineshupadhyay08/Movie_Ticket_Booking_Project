import React, { useState } from 'react'
import { dummyBookingData } from '../assets/assets'

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY  

  const [booking,setBooking] = useState([])
  const [isLoding,setIsLoding] = useState(true)
  const getMyBooking = async ()=>{
    setBooking(dummyBookingData)
    setIsLoding(false)
  }
  
  return (
    <div>
      
    </div>
  )
}

export default MyBookings
