import mongoose from "mongoose";

const paperSchema = new mongoose.Schema({
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
    eventDates:[{
        type:Date
    }],
    eventName:{
        type:String
    },
    location:{
        type:String
    },
    publisher:{
        type:String
    },
    certificate:{
        type:String  
    },
    photos:[{
        type:String  
    }],
    pdf:{
        type:String
    },
    status:{
        type:String,
        enum:['On Hold','Grant','Published'],
        required:true
    },
    bill:{
        type:String
    },
},{timestamps:true});

const Paper = mongoose.model('Paper', paperSchema, 'papers');

export {Paper};