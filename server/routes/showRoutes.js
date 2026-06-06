import express from "express";
import { addShow, getNowPlayigMovies } from "../controllers/showController.js";


const showRouter = express.Router();

showRouter.get('/now-playing',getNowPlayigMovies)
showRouter.post('/add',addShow)



export default showRouter;