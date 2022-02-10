import {User} from '../user.model.js';
import mongoose from 'mongoose';

describe("Testing the user model", () => {
    test("Testing the user email", () => {
        const email = User.schema.obj.email;
        expect(email).toEqual({
            type: String,
            required: true,
            unique: true,
            trim: true
        })
    });

    test("Testing for user password", () => {
        const password = User.schema.obj.password;
        expect(password).toEqual({
            type: String,
            required: true,
            minLength: 8
        })
    })

})