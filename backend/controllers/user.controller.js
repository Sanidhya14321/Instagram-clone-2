import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt  from  "jsonwebtoken"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(401).json({
        message: "Something is missing, please check!",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "Try Different Email Address.",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "Account  Created  Successfully.",
      success: false,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login=async(req,res)=>{
    try {
        const {email ,password}=req.body;
        if (!email || !password) {
            return res.status(401).json({
              message: "Something is missing, please check!",
              success: false,
            });
        }
        let user=await User.findOne({email})
        if(!user){
            return res.status(401).json({
                message:"Incorrect  Email or Password.",
                success:false
            })
        }
        const isPasswordMatch= await bcrypt.compare(password,user.password)
        if(!isPasswordMatch){
          return res.status(401).json({
            message: "Something is missing, please check!",
            success: false,
          });
        }

        user={
          _id:user._id,
          username:user.username,
          email:user.email,
          profilePicture:user.profilePicture,
          bio:user.bio,
          followers:user.followers,
          following:user.following,
          posts:user.posts
        }

        const token= await jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:'1d'})
        return res.cookie('token',token,{httpOnly:true,sameSite:'strict',maxAge:1*24*60*60*100}).json({
          message:`Welcome Back ${user.username}`,
          success:true
        })

    } catch (error) {
        console.log(error)
    }
}

export const logout=async(_,res)=>{
  try {
    return res.cookie("token","",{maxAge:0}).json({
      message:"Logged Out Successfully",
      success:true
    })
  } catch (error) {
    console.log(error)
  }
}

export const getProfile=async(req,res)=>{
  try {
    const userId=req.params.id
    let user=await User.findById(userId)
    return res.status(200).json({
      user,
      success:true
    })
  } catch (error) {
    console.log(error)
  }
}

export const editProfile=async(req,res)=>{
  try {
    const  userId=req.id
    const {bio,gender}=req.body;
    const profilePicture=req.file
    let cloudResponse;

    if(profilePicture){
      const fileUri=getDataUri(profilePicture)
      cloudResponse=await cloudinary.uploader.upload(fileUri)
    }

    const user=await User.findById(userId)
    if(!user){
      return res.status(401).json({
        message:"User not Found",
        success:false
      })
    }
    
  } catch (error) {
    console.log(error)
  }
}