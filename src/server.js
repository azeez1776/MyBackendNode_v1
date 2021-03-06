import express from 'express';
import { connect } from './utils/db.js';
import itemRouter from './resources/item/item.router.js';
import { signin, signup, protect } from './utils/auth.js'
import morgan from 'morgan';


export const app = express();

app.use(morgan('dev'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = 4000;

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.post('/signin', signin);
app.post('/signup', signup);

app.use('/api', protect);
app.use('/api/items', itemRouter);

export const start = async () => {
    try {
        await connect();
        app.listen(PORT, () => {
            console.log(`Listening to port ${PORT}`)
        })
    }
    catch (err) {
        console.log(err)
    }

}
