import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    staffId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:['Admin','Prof']
    }
},{timestamps:true});

const User = mongoose.model('User', userSchema);

export {User};