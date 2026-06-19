import { clerkClient } from "@clerk/express";
import Booking from "../models/Booking.js";
import movie from "../models/Movies.js";

export const getUserBookings = async(req,res)=>{
  try {
    const user = req.auth().userId;

    const bookings = await Booking.find({user}).populate({
      path: 'show',
      populate: {path: "movie"}
    }).sort({createdAt: -1})
    res.json({success:true,bookings})
  } catch (error) {
    res.json({success: false,message:error.message});
    
  }
}


export const updateFavoritMovies = async(req,res)=>{
  try {
    const {movieId} = req.body;
    const userId = req.auth().userId;

    const user = await clerkClient.users.getUser(userId)

    if(!user.privateMetadata.favorites){
      user.privateMetadata.favorites = []
    }
    if(!user.privateMetadata.favorites.includes(movieId)){
      user.privateMetadata.favorites.push(movieId)
    }else{
      user.privateMetadata.favorites = user.privateMetadata.favorites.filter(item => item !== movieId)
    }
    await clerkClient.user.updateUserMetadata(userId,{privateMetadata: user.privateMetadata})
    res.json({success:true,message: "Favorite added successfully"})


  } catch (error) {
    console.error(error.message)
    res.json({success: false, message:error.message});
    
  }
}


export const getFavorite = async(req,res)=>{
  try {
    const user = await clerkClient.users.getUser(req.auth().userId)
    const getUser = user.privateMetadata.favorites;

    const movies = await Movie.find({_id: {$in: favorites}})
    res.json({success:true,movies})
  } catch (error) {
    console.error(error.message)
    res.json({success: false,message:error.message});
  }
}