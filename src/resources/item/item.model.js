import mongoose from 'mongoose';


const item = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
   notes:String,
    due:Date
},
    {timestamps: true}
)