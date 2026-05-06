import React, { useEffect, useState } from 'react'
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets'
import Loading from '../components/Loading'
import { ClockIcon } from 'lucide-react'
import { useParams } from 'react-router'
import isoTimeFormat from '../lib/isoTimeFormat'
import BlurCircle from '../components/BlurCircle'
import { toast } from 'react-toastify'

const SeatLayout = () => {

  const { id, data } = useParams()
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const [show, setShow] = useState(null)

  const getShow = async () => {
    const foundShow = dummyShowsData.find((item) => item._id === id)

    if (foundShow) {
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData,
      })
    } else {
      setShow(null)
    }
  }

  const handleSeatClick = (seatId) =>{
    if(!selectedTime){
      return toast("Please Select time first")
    }
    if(!selectedSeats.includes(seatId) && selectedSeats.length > 4){
      return toast("You can only select 5 sears")
    }
    setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(seat => seat !== seatId) : [...prev, seatId])
  }

  const renderSeats = (row, count=9) => {
    <div key={row} className='flex gap-2 mt-2'>
      <div className='flex flex-wrap items-center justify-center gap-2'>
        {Array.from({ length: count }, (_, i) =>{
          const seatId = `${row}${i + 1}`;
          return(
            <button key={seatId} onClick={()=> handleSeatClick(seatId)} className={`h-8 w-8 rounded border border-primary/60 cursor-pointer ${selectedSeats.includes(seatId) && "bg-primary text-white"}`}>
              {seatId}
            </button>
          )
        })}

      </div>
    </div>
  }

  useEffect(() => {
    getShow()
  }, [id])

  return show ? (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50">
      <div className="w-60 bg-primary/10 border-primary/20 rounded-lg py-10 h-max md:sticky md:to-pink-30">
        <p className="text-lg font-semibold px-6">Available Timings</p>
        <div className='mt-5 space-y-1'>

      {show?.dateTime?.[data]?.map((time, index) => (
        <div
        key={index}
        className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${
          selectedTime?.time === time.time
          ? "bg-primary text-white"
          : "hover:bg-primary/20"
        }`}
        onClick={() => setSelectedTime(time)}
        >
        <ClockIcon className="w-4 h-4" />
        <p className="text-sm">
          {isoTimeFormat(time.time)}
        </p>
      </div>
    ))}
    </div>
    </div>

      <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
        <BlurCircle top='-100px' left='-100px'/>
        <BlurCircle bottom='0' right='-0'/>
        <h1 className='text-2xl font-semibold mb-4'>Select your seat</h1>
        <img src={assets.screenImage} alt='screen'/>
        <p className='text-gray-400 text-sm mb-6'>SCREEN SIDE</p>

      </div>

    </div>
  ) : (
    <Loading />
  );
}

export default SeatLayout

