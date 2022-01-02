import mongoose from 'mongoose';
import options from '../config';

export const connect = (url=options.dbURL, opts={}) => {
   return mongoose.connect(
       url,
       {...opts, useNewUrlParser:true},
       (error) => {
           console.log(`The following error on establishing connection with MongoDB Atlas ${error}`)
       }
   )
}