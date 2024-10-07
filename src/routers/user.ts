import { Router } from "express";
// import { getProfile, updatePreferences } from "../controllers";
import { isLoggedIn } from "../middlewares";



export const userRouter = Router();

// userRouter.post("/profile", isLoggedIn, getProfile)
// userRouter.post("/preferences",isLoggedIn, updatePreferences)

