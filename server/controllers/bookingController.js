import Booking from "../models/Booking.js";
import Show from "../models/Show.js"
import stripe from "stripe";

const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

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
    let booking;

    try{
       const {userId} = req.auth();
       const {showId, selectedSeats} = req.body;
       const { origin } = req.headers;

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

       const showData = await Show.findById(showId).populate("movies");

       if (!showData) {
        return res.status(404).json({
          success: false,
          message: "Show not found",
        });
       }

       booking = await Booking.create({
        user:userId,
        show: showId,
        amount: showData.showPrice * selectedSeats.length,
        bookedSeats: selectedSeats,
       })

       const line_items = [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: showData.movies?.title || "Movie Ticket",
          },
          unit_amount: Math.floor(booking.amount) * 100
        },
        quantity: 1
       }]

       const session = await stripeInstance.checkout.sessions.create({
        success_url: `${origin}/my-bookings?payment=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/my-bookings?payment=cancelled`,
        line_items: line_items,
        mode: 'payment',
        metadata: {
          bookingId: booking._id.toString(),
        },
       })

       booking.paymentLink = session.url
       await booking.save();

       res.json({
        success: true,
        message: "Redirecting to payment...",
        url: session.url,
       })

    }catch(error){
      if (booking && !booking.paymentLink) {
        await Booking.findByIdAndDelete(booking._id);
      }

      console.log(error.message);
      res.json({
        success: false,
        message: error.message,
      })
    }
}

export const stripeWebhook = async (req, res) => {
  const signature = req.headers["stripe-signature"];

  try {
    const event = stripeInstance.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    if (event.type === "checkout.session.completed") {
      const bookingId = event.data.object.metadata?.bookingId;

      if (bookingId) {
        const booking = await Booking.findById(bookingId);

        if (booking && !booking.isPaid) {
          const seatUpdates = {};
          const unavailableSeatFilters = booking.bookedSeats.map((seat) => ({
            [`occupiedSeats.${seat}`]: { $exists: true },
          }));

          booking.bookedSeats.forEach((seat) => {
            seatUpdates[`occupiedSeats.${seat}`] = booking.user;
          });

          const showData = await Show.findOneAndUpdate(
            {
              _id: booking.show,
              $nor: unavailableSeatFilters,
            },
            { $set: seatUpdates },
            { new: true },
          );

          if (!showData) {
            throw new Error("Selected seats are no longer available");
          }

          booking.isPaid = true;
          await booking.save();
        }
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.log("Stripe webhook error:", error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};



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
