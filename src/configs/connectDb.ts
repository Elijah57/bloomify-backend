import * as mongoose from "mongoose"
import  config from "./index";

export default async function connectDb(){
    try{

        await mongoose.connect(config.DB_URI);
        console.log("Database connection successful");

    }catch (error){
        throw new Error("could not connect to database")
    }
}