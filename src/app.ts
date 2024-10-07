import express from "express";
import { Request, Response } from "express";
import {authRouter, userRouter, contentRouter} from "./routers";
import { errorHandler, routeNotFound } from "./middlewares"
import cors from "cors"

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.get("/", (req: Request, res: Response) => {
    res.send("Hello world");
});

app.use("/api/user", userRouter);
app.use("api/content", contentRouter)
app.use("/api/auth", authRouter);
app.use(routeNotFound);
app.use(errorHandler);


export default app;