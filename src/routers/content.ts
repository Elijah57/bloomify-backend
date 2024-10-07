import { isLoggedIn } from "../middlewares";
// import { getuserContent, generateContent } from "../controllers";
import { Router } from "express";

const contentRouter = Router();

// contentRouter.post("/generate", isLoggedIn, generateContent);
// contentRouter.get("/user", isLoggedIn, getuserContent)


export {contentRouter};