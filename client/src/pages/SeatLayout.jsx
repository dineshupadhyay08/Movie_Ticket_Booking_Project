import React, { useEffect } from 'react'
import { dummyShowsData } from '../assets/assets'
import Loading from '../components/Loading'

const SeatLayout = () => {

  const {id, date} = useParams()
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const [Show, setShow] = useState(null)

  const navigate = useNavigate()

  const getShow = async () => {
    const show = dummyShowsData.find(show => show._id)
    if (show) {
      setShow({
        movie: show,
        dateTime: dummyDateTimeData,

      })
    }
  }

  useEffect(() => {
    getShow()
  },[])

  return show ? (
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50'>
      
    </div>
  ) : (
    <Loading/>
  )
}

export default SeatLayout

