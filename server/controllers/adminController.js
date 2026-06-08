import { User } from "@clerk/express"
import { Booking } from "../models/Booking"
import Show from "../models/Show"


export const isAdmin = async(req,res)=>{
  res.json({success:true, isAdmin:true})
}


export const getDashboardData = async(req,res)=>{
  try{
    const booking = await Booking.find({isPaid:true})
    const activeShows = await Show.find({showDateTime:{$gte: new Date()}}).populate("movie");

    const totalUser = await User.countDocuments();

    const getDashboardData = {
      totalBooking:booking.length,
      totalRevenue:booking.reduce((acc,booking)=>acc + booking.amoutn, 0),
      activeShows,
      totalUser
    }
    res.json({success:true,getDashboardData})
  }catch(error){
    console.log(error)
    res.json({
      success: false,
      message: error.message,
    })
  }
}