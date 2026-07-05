import express from "express";
import { getFavorite, getUserBookings, updateFavoritMovies } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get('/bookings',getUserBookings)
userRouter.post('/update-favorite',updateFavoritMovies)
userRouter.get('/favorites',getFavorite)

export default userRouter;
