import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../assets/assets'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import { dateFormat } from '../lib/dateFormat'

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY  

  const [booking,setBooking] = useState([])
  const [isLoding,setIsLoding] = useState(true)
  const getMyBooking = async ()=>{
    setBooking(dummyBookingData)
    setIsLoding(false)
  }

  useEffect(()=>{
    getMyBooking()
  },[])
  
  return !isLoding ? (
    <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]">
      <BlurCircle top="0px" left="100px" />
      <div>
        <BlurCircle bottom="0px" left="600px" />
      </div>
      <h1 className="text-lg font-semibold mb-4">My Booking</h1>
      {booking.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-3 bg-primary/8 border border-primary/20 rounded-md mt-3 p-2 w-full max-w-2xl"
        >
          <img
            src={item.show.movie.poster_path}
            alt=""
            className="w-20 h-28 object-cover rounded"
          />

          <div className="flex flex-col whitespace-nowrap">
            <p className="text-sm font-semibold">{item.show.movie.title}</p>

            <p className="text-gray-400 text-xs">{item.show.movie.runtime}</p>

            <p className="text-gray-400 text-xs mt-3">
              {dateFormat(item.show.showDateTime)}
            </p>
          </div>
          <div className="flex flex-col md:items-end md:text-right justify-between w-full p-4">
            <div className="flex items-center gap-4">
              <p className="text-2xl font-semibold mb-3">
                {currency}
                {item.amount}
              </p>
              {!item.isPaid && (
                <buton className="bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer">
                  Pay now
                </buton>
              )}
            </div>
            <div className="text-sm">
              <p className="text-gray-400">
                <span>Total Tickets:</span>
                {item.bookedSeats.length}
              </p>
              <p className="text-gray-400">
                <span>Seat Number:</span>
                {item.bookedSeats.join(", ")}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <Loading />
  );
}

export default MyBookings
