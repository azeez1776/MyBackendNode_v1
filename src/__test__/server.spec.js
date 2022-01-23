import { exportAllDeclaration, EXPORTDECLARATION_TYPES } from '@babel/types';
import request from 'supertest';
import { app } from '../server';



describe('Checking api auth', () => {
    test('Should not fetch items', async () => {
        let response = await request(app).get('/api/items')
        expect(response.statusCode).toBe(401)
    })
})

