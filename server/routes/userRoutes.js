import express from "express";
import { getFavorite, getUserBookings, updateFavoritMovies } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get('/bookings',getUserBookings)
userRouter.get('/update-favorite',updateFavoritMovies)
userRouter.get('/favorites',getFavorite)

export default userRouter;