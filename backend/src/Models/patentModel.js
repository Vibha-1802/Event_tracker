import mongoose from "mongoose";

const patentSchema = new mongoose.Schema({
    staff:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    topic:{
        type:String,
        required:true
    },
    domain:[{
        type:String
    }],
    date:{
        type:Date
    },
    approvalProof:{
        type:String  
    },
    pdf:{
        type:String
    },
    status:{
        type:String,
        enum:['On Hold','Grant','Accepted'],
        default: "On Hold"
    },
},{timestamps:true});

const Patent = mongoose.model('Patent', patentSchema);

export {Patent};