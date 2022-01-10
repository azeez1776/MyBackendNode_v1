import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },

},
    { timestamps: true }
);

userSchema.pre('save', function (next) {
    if (!this.isModified('password'))
        next()
    bcrypt.hash(this.password, 8, (err, hash) => {
        if (err) {
            next(err)
        }

        this.password = hash;
        next()
    })

    userSchema.methods.checkPassword = function (password) {
        const paswordHash = this.password;
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, paswordHash, (err, same) => {
                if (err) reject(err);
                resolve(same)
            })
        })
    }
}

)