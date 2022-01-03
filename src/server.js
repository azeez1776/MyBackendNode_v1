import express from 'express';
import {connect} from './utils/db.js';

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send("Hello World")
})

export const start = async () => {
    try{
        await connect();
        app.listen(PORT, () =>{
            console.log(`Listening to port ${PORT}`)
        })
    }
    catch(err){
        console.log(err)
    }

}
