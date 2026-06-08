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
       
    }catch(error){

    }
}