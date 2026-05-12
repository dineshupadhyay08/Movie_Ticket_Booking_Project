import React, { useState } from 'react'

const Dashbooard = () => {

  const currency = import.meta.env.VITE_CURRENCY

  const [dashboardData, setDashboardData] = useState({
    totalBookings : 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser : 0
  })

  

  return (
    <div>
    
    </div>
  )
}

export default Dashbooard
