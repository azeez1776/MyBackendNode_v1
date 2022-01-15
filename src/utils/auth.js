import { User } from '../resources/user/user.model.js';
import { config } from '../config/dev.js';
import jwt from 'jsonwebtoken';

export const newToken = (user) => {
    return jwt.sign({ id: user.id }, config.secrets.jwt, {
        expiresIn: 10000
    })
}

export const verifyToken = token => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.secrets.jwt, (err, payload) => {
            if (err) reject(err)

            resolve(payload)
        })
    })
}

export const signup = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            res.status(400).send('Include both email and password')
        }

        const user = await User.create(req.body);
        console.log(user)
        const token = newToken(user);
        console.log(token)
        res.status(201).send({ token })
    } catch (err) {
        res.status(500).send('Server Error')
        console.log(err)
    }
}

export const signin = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            res.status(400).send('Include both email and password');
        }

        const user = await User.findOne({ email: req.body.email })
            .select('email password')
            .exec()

        if (!user) {
            res.status(400).send({ message: 'Invalid email and password' })
        }


        const match = await user.checkPassword(req.body.password)

        if (!match) {
            res.status(400).send({ message: 'Invalid email and password' })
        }

        const token = newToken(user);

        res.status(200).send({ token })

    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Server Error" })
    }
}

export const protect = async (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')) {
        res.status(401).json({ message: "Not authorised" }).end()
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

