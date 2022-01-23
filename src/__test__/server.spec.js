import request from 'supertest';
import { app } from '../server';
import { User } from '../resources/user/user.model';
import { newToken } from '../utils/auth';
import mongoose from 'mongoose';

describe('API Authentication', () => {
    let token;
    beforeEach(async () => {
        const user = await User.create({ email: 'admin@test.com', password: '12345678' });
        token = newToken(user);
    })
})



describe('Checking api auth', () => {
    test('Should not fetch items', async () => {
        let response = await request(app).get('/api/items')
        expect(response.statusCode).toBe(401)
    })

    test('Testing requests with jwt token', () => {
        const id = mongoose.Types.ObjectId();
        const jwt = `Bearer ${token}`;

        const result = await Promise.all([
            request(app)
                .get('/api/item')
                .set('Authorization', jwt),
            request(app)
                .get(`/api/items/${id}`)
                .set('Authorzation', jwt),
            request(app)
                .post('/api/items')
                .set('Authorization', jwt),
            request(app)
                .put(`/api/items/${id}`)
                .set('Authorization', jwt),
            request(app)
                .delete(`/api/items/${id}`)
                .set('Authorization', jwt)
        ])

        result.forEach(res => expect(res.statusCode).not.toBe(401))
    })
})

