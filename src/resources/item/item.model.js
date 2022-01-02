import mongoose from 'mongoose';

import {Schema} from "mongoose";

const item = Schema({
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