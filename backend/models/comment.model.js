import mongoose from "mongoose";

const commentSchema=new mongoose.Schema({
    text:{type:String,required:true},
    author:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    post:{type:mongoose.Schema.Types.ObjectId,ref:'Post',required:true},
})

export default commentSchema=mongoose.Schema('Comment',commentSchema)