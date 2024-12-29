import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app=express();

//MIDDLEWARE
app.use(express.json());
app.use(cookieParser());


const PORT=8000;

app.listen(PORT,()=>{
    console.log(`server listen at port ${PORT}`)
})