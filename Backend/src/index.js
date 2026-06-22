import express from "express";
import connectDB from "./config/db.js";
import dotenv from 'dotenv'
import authRouter from "./router/auth.router.js";
dotenv.config();
const app = express();
connectDB();
app.use(express.json());
app.use("/api/auth", authRouter);

app.get("/",(req,res)=>{
    res.send("Hello this the root page");
})




const PORT=3000;
app.listen(PORT,()=>{
    console.log("server is connected successfully")
})