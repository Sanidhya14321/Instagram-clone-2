import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app=express();

app.get("/",(req,res)=>{
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

const PORT=8000;

app.listen(PORT,()=>{
    console.log(`server listen at port ${PORT}`)
})