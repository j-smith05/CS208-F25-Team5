const {describe, expect, test} = require("@jest/globals");

// supertest is a framework that allows to easily test web APIs
const supertest = require('supertest');
const app = require('./../app');
const request = supertest(app);

describe('REST APIs for jeopardy questions', () =>
{
    describe('GET /api/jeopardy', () =>
    {
        test('should return a 200 (ok) status code', async() =>
        {
            const response = await request.get('/api/jeopardy');
            expect(response.status).toBe(200);
        });

        test('should have Content-Type "application/json"', async() =>
        {
            const response = await request.get('/api/jeopardy');
            expect(response.header['content-type']).toMatch(/application\/json/);
        });

        test('should contain the keys "category", "question", "answer", and "points" in the first question', async() =>
        {
            const response = await request.get('/api/jeopardy');
            const response_content_as_json = response.body;

            expect(response_content_as_json[0]).toHaveProperty('category');
            expect(response_content_as_json[0]).toHaveProperty('question');
            expect(response_content_as_json[0]).toHaveProperty('answer');
            expect(response_content_as_json[0]).toHaveProperty('points');
        });
    });

    describe('GET /api/jeopardy_2', () =>
    {
        test('should return a 200 (ok) status code', async() =>
        {
            const response = await request.get('/api/jeopardy_2');
            expect(response.status).toBe(200);
        });

        test('should have Content-Type "application/json"', async() =>
        {
            const response = await request.get('/api/jeopardy_2');
            expect(response.header['content-type']).toMatch(/application\/json/);
        });
    });

    describe('GET /api/jeopardy_3', () =>
    {
        test('should return a 200 (ok) status code', async() =>
        {
            const response = await request.get('/api/jeopardy_3');
            expect(response.status).toBe(200);
        });

        test('should have Content-Type "application/json"', async() =>
        {
            const response = await request.get('/api/jeopardy_3');
            expect(response.header['content-type']).toMatch(/application\/json/);
        });
    });
});
