
import { reg } from "../helpers/authHelper.js";
import User from "../model/userSchema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const authregistration = async (req, res) => {


  const { username, usermail, userrole, password } = req.body;
  try {
    const user = await reg({ username, usermail, userrole, password });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.username,
        email: user.usermail,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};

export const userlogin = async (req, res) => {
  try {
    const { usermail, password } = req.body;
    
    
    
    const Userinfo =await User.findOne({usermail});
    
    if (!Userinfo) {
      return res.status(401).json({ message: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, Userinfo.password);
    if (!isMatch) {
      return res.status(401).json({ message: "credential is wrong" });
    }
    const token = jwt.sign({ id: Userinfo._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({
      success: true, 
      message: "successfully login",
      token,
      user: {
        
        role: Userinfo.userrole,
      },
    });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Login failed" });
  }
};
