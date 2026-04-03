import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    staffId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true,
        min:21
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    gmail:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true,
        enum:['HOD','Asst Prof','Prof']
    },
    department:{
        type:String,
        required:true
    },
    expertise:[{
        type:String,
        required:true
    }],
    joiningDate:{
        type:Date,
        required:true
    },
    photo:{
        type:String,
        required:true
    }
},{timestamps:true});

const Profile = mongoose.model('Profile', profileSchema);

export {Profile};