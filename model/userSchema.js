import mongoose from 'mongoose'
const userSchema =new mongoose.Schema({
    username:{
        type:String
    },
    usermail:{
        type:String
    },
    password:{
        type:String
    },
    isDeleted:{
        type:Boolean,
        default:false,
    },
    userrole:{
        type:String
    }
})
const User=mongoose.model("User",userSchema)
export default User;
