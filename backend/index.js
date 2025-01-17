import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import messageRoute from "./routes/message.route.js"
import postRoute from "./routes/post.route.js"

dotenv.config({});

const PORT=process.env.PORT || 3000;

const app=express();

app.get("/",(_,res)=>{
    return res.status(200).json({
        message:"I'm coming from backend",
        success:true
    })
})

//MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true}));
const corsOptions={
    origin:'http://localhost:5173',
    credentials:true,
}

app.use(cors(corsOptions));

app.use("/api/v1/user",userRoute)
app.use("/api/v1/post",postRoute)
app.use("/api/v1/message",messageRoute)

app.listen(PORT,()=>{
    connectDB()
    console.log(`server listen at port ${PORT}`)
})