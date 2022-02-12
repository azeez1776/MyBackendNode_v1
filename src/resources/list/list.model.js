import mongoose from 'mongoose';

const ListSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    }
})