import mongoose from 'mongoose';
import {config} from '../config/dev.js';

export const connect = (url=config.dbURL, opts={}) => {
   return mongoose.connect(
       url,
       {...opts, useNewUrlParser:true}
   )
}