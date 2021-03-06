import { User } from '../resources/user/user.model.js';
import { config } from '../config/dev.js';
import jwt from 'jsonwebtoken';

//Create new token
export const newToken = (user) => {
    return jwt.sign({ id: user.id }, config.secrets.jwt, {
        expiresIn: 10000
    })
}

//Verify Token
export const verifyToken = token => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.secrets.jwt, (err, payload) => {
            if (err) reject(err)

            resolve(payload)
        })
    })
}

// Sign up
export const signup = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send('Include both email and password')
        }

        const user = await User.create(req.body);
        console.log(user)
        const token = newToken(user);
        console.log(token)
        return res.status(201).send({ token })
    } catch (err) {
        console.log(err)
        return res.status(500).send('Server Error')
    }
}

//Sign in
export const signin = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send('Include both email and password');
        }

        const user = await User.findOne({ email: req.body.email })
            .select('email password')
            .exec()

        if (!user) {
            return res.status(400).send({ message: 'Invalid email and password' })
        }


        const match = await user.checkPassword(req.body.password)

        if (!match) {
            return res.status(400).send({ message: 'Invalid email and password' })
        }

        const token = newToken(user);

        return res.status(200).send({ token })

    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: "Server Error" })
    }
}

//protect
export const protect = async (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Not authorised" }).end()

    }

    const token = bearer.split('Bearer ')[1].trim();


    let payload;
    try {
        payload = await verifyToken(token);
    } catch (err) {
        res.status(401).json({ message: "Not authorised" }).end();
    }


    const user = await User.findById(payload.id)
        .select('-password')
        .exec()

    if (!user) {
        return res.status(401).json({ message: "Not authorised" }).end()
    }

    req.user = user;

    next();
}

