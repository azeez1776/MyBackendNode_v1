import { exportAllDeclaration, EXPORTDECLARATION_TYPES } from '@babel/types';
import request from 'supertest';
import { app } from '../server';



describe('Checking api auth', () => {
    test('Should not fetch items', async () => {
        let response = await request(app).get('/api/items')
        expect(response.statusCode).toBe(401)
    })
})

const add = (a, b) => {
    return a + b
}

describe('Adding', () => {
    test('Expecting 3 with 1 and 2', () => {
        let data = add(1, 2);
        expect(data).toBe(3);
    })
})