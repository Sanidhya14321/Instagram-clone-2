import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

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
    } catch (error) {
        console.log(error)
    }
}