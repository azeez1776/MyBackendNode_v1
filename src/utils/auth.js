import { User } from '../resources/user/user.model';
import config from '../config/dev';
import jwt from 'jsonwebtoken';

export const newToken = () => {
    return jwt.sign({ id: User.id }, config.secrets.jwt, {
        expiresIn: 10000
    })
}

export const verifyToken = token => {
    new Promise((resolve, reject) => {
        jwt.verify(token, config.secrets.jwt, (err, payload) => {
            if (err) reject(err);
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
        const token = newToken(user);
        res.status(201).send({ token })
    } catch {
        res.status(500).send('Server Error')
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
        res.status(500).send({ message: "Server Error" })
    }
}

