import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../../assets/assets'
import Loading from '../../components/Loading'
import Title from '../../components/Admin/Title'

const ListBookings = () => {

  const currency = import.meta.env.VITE_CURRENCY

  const [bookings,setBookings] = useState([])
  const [isLoading,setIsLoading] = useState(true);

  const getAllBookings = async () =>{
    setBookings(dummyBookingData)
    setIsLoading(false)
  };

  useEffect(()=>{
    getAllBookings();
  },[]);

  return ! isLoading ? (
    <>
    <Title text1="List" text2="Booking"/>
    <table>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
    </table>
      
    </>
  ) : <Loading/>
}

export default ListBookings
