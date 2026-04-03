import mongoose from "mongoose";

const fdpSchema = new mongoose.Schema({
    staff:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    topic:{
        type:String,
        required:true
    },
    skillsGained:[{
        type:String
    }],
    dates:[{
        type:Date
    }],
    certificate:{
        type:String  
    },
    photos:[{
        type:String  
    }]
},{timestamps:true});

const Fdp = mongoose.model('Fdp', fdpSchema);

export {Fdp};