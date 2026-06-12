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


export const getAllShows = async (req,res)=>{
  try{
    const show = await Show.find({showDateTime: { $gte: new Date()}}).populate('movie').sort({showDateTime: 1})
    res.json({success:false,message: error.message})
  }catch(error){
    console.error(error);
    res.json({success: false, message:error.message})
  }
}


export const getAllBookings = async(req,res)=>{
  try {
    const bookings = await Booking.find({}).populate('user').populate({
      path: "show",
      populate: {path: "movie"}
    }).sort({createdAt: true,booking})
  } catch (error) {
    console.erorr(error);
    res.json({success: false,message:error.message})
  }
}