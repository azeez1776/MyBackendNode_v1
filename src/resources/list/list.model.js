import mongoose from 'mongoose';

const ListSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    description:String,
    createdBy:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'user',
        required:true
    }
},
    {timestamps:true}

    )