import mongoose from "mongoose";

const socialServiceSchema = new mongoose.Schema({
    staff:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    dates:[{
        type:Date
    }],
    location:{
        type:String
    },
    certificate:{
        type:String  
    },
    photos:[{
        type:String  
    }]
},{timestamps:true});

const SocialService = mongoose.model('SocialService', socialServiceSchema);

export {SocialService};