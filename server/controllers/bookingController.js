import Show from "../models/Show"

const checkSeatsAvailability = async (req, res) => {
  try{
    const showData = await Show.findById(showId)
    if(!showData)return false;

    const occupiedSeats = showData.occupiedSeats;

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
       const {origin} = req.headers;

       const isAvilable = await checkSeatsAvailability(showId, selectedSeats);
       if(!isAvilable){
        return res.json({
            success: false,
            message: "Selected seats are not available",
          })
       }

       const showData = await Show.findById(showId).populate("movies");

       const booking = await Booking.create({
        user:userId,
        show: showId,
        amount: showData.showPrice * selectedSeats.length,
        bookedSeats: selectedSeats,
       })

       selectedSeats.map((seat)=>{
        showData.occupiedSeats[seat] = userId;
       })

       showData.markModified("occupiedSeats");

       await showDate.save();
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
    const occupiedSeats = Object.keys(showData.occupiedSeats);

    res.jso({
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