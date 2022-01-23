import { exportAllDeclaration, EXPORTDECLARATION_TYPES } from '@babel/types';
import request from 'supertest';
import { app } from '../server';
import { User } from '../resources/user/user.model';

describe('API Authentication', () => {
    let token;
    beforeEach(async () => {
        const user = await 
    })
})



describe('Checking api auth', () => {
    test('Should not fetch items', async () => {
        let response = await request(app).get('/api/items')
        expect(response.statusCode).toBe(401)
    })
})

