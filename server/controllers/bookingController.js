import Booking from "../models/Booking.js";
import Show from "../models/Show.js"

const checkSeatsAvailability = async (showId, selectedSeats) => {
  try{
    const showData = await Show.findById(showId)
    if(!showData)return false;

    const occupiedSeats = showData.occupiedSeats || {};

    const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats[seat]);

    return !isAnySeatTaken;

  }catch(error){
    console.log(error.message);
    return false;
  }
}


export const createBooking = async(req,res)=>{
    try{
       const {userId} = req.auth();
       const {showId, selectedSeats} = req.body;

       if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Please login to book tickets",
        });
       }

       if (!showId || !Array.isArray(selectedSeats) || selectedSeats.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Please select at least one seat",
        });
       }

       const isAvilable = await checkSeatsAvailability(showId, selectedSeats);
       if(!isAvilable){
        return res.json({
            success: false,
            message: "Selected seats are not available",
          })
       }

       const showData = await Show.findById(showId);

       if (!showData) {
        return res.status(404).json({
          success: false,
          message: "Show not found",
        });
       }

       const booking = await Booking.create({
        user:userId,
        show: showId,
        amount: showData.showPrice * selectedSeats.length,
        bookedSeats: selectedSeats,
       })

       showData.occupiedSeats = showData.occupiedSeats || {};

       selectedSeats.forEach((seat)=>{
        showData.occupiedSeats[seat] = userId;
       })

       showData.markModified("occupiedSeats");

       await showData.save();
       res.json({
        success: true,
        message: "Booking created successfully",
       })

    }catch(error){
      console.log(error.message);
      res.json({
        success: false,
        message: error.message,
      })
    }
}



export const getOccupiedSeats = async(req,res)=>{
  try{
    const {showId} = req.params;
    const showData = await Show.findById(showId);

    if (!showData) {
      return res.status(404).json({
        success: false,
        message: "Show not found",
      });
    }

    const occupiedSeats = Object.keys(showData.occupiedSeats);

    res.json({
      success: true,
      occupiedSeats,
    })

  }catch(error){
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    })
  }
}
