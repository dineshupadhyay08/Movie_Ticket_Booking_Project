import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets'
import Loading from '../../components/Loading'
import Title from '../../components/Admin/Title'
import { dateFormat } from '../../lib/dateFormat'
import { useAppContext } from '../../context/AppContext'

const ListShows = () => {

  const currency = import.meta.env.VITE_CURRENCY

  const {axios, getToken, user} = useAppContext()

  const [show,setShow] = useState([])
  const [loading,setLoading] = useState(true)

  // const getAllShow = async () =>{
  //   try {
  //     const { data } = await axios.get("/api/admin/all-shows",{
  //       headers:{
  //         Authorization: `Bearer ${getToken()}`
  //       }
  //     })
  //     setShow(data.shows);
  //     setLoading(false);
  //   }catch(error){
  //     console.log(error);
  //   }
  // }
  
  const getAllShow = async () => {
    try {
      const token = await getToken();

      console.log("Token:", token);

      const { data } = await axios.get("/api/admin/all-shows", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(data);

      if (data.success) {
        setShow(data.shows || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(user){
      getAllShow();
    }
  },[user]);


  return ! loading ? (
    <>
     <Title text1="List" text2="Shows"/> 
     <div className='max-w-4xl mt-6 overflow-x-auto'>
      <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
        <thead>
          <tr className='bg-primary/20 text-left text-white'>
            <th className='p-2 font-medium pl-5'>Movie Name</th>
            <th className='p-2 font-medium'>Show Time</th>
            <th className='p-2 font-medium'>Total Bookings</th>
            <th className='p-2 font-medium'>Earnings</th>
          </tr>
        </thead>
        <tbody>
          {show.map((show,index)=>(
            <tr key={index} className='border-b border-primary/10 bg-primary/5 even:bg-primary/10'>
              <td className='p-2 min-w-45 pl-5'>{show.movie.title}</td>
              <td className='p-2'>{dateFormat(show.showDateTime)}</td>
              <td className='p-2'>{Object.keys(show.occupiedSeats).length}</td>
              <td>
                {currency}{Object.keys(show.occupiedSeats).length * show.showPrice}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     </div>
    </>
  ) : <Loading/>
}

export default ListShows
