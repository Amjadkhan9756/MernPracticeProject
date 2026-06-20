import express from "express";
import connectDB from "./config/db.js";
import dotenv from 'dotenv'
dotenv.config();
const app = express();
connectDB();



app.get("/",(req,res)=>{
    res.send("Hello this the root page");
})




const PORT=3000;
app.listen(PORT,()=>{
    console.log("server is connected successfully")
})