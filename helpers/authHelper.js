import mongoose from "mongoose"
import User from "../model/userSchema.js"
import bcrypt from "bcrypt"


export const reg = async(userData)=>{
const {username,usermail,userrole,password}=userData
try {
   if (!usermail||!password||!username||!userrole){
    throw new error("All fields required")
   } 
   const hashedPassword =await bcrypt.hash(password,10)
   const user =await User.create({
    username,usermail,password:hashedPassword,userrole
   })
   return user
} catch (error) {
   console.log(error);
    
}
}