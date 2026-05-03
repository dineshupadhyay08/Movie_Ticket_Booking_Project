import React from 'react'

const SeatLayout = () => {

  const {id, date} = useParams()
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const [Show, setShow] = useState(null)
  const navigate = useNavigate()


  return (
    <div>
      
    </div>
  )
}

export default SeatLayout

