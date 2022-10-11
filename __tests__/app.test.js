const app = require('../app');
const request = require('supertest');
const db = require(`../db/connection`);
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');

beforeEach(() => seed(testData));

afterAll(() => {
	if (db.end) db.end();
});

describe('get:', () => {
	describe('/api/topics', () => {
		test('status:200 returns a single array', () => {
			return request(app)
				.get('/api/topics')
				.expect(200)
				.then(res => {
					expect(res._body).toBeInstanceOf(Array);
				});
		});
		test('status:200 returns a array of objects containing property: slug & description', () => {
			return request(app)
				.get('/api/topics')
				.expect(200)
				.then(res => {
					res._body.forEach(news => {
						expect(news).toEqual(
							expect.objectContaining({
								slug: expect.any(String),
								description: expect.any(String),
							}),
						);
					});
				});
		});
		test('status:404 Not Found', () => {
			return request(app)
				.get('/api/topic')
				.expect(404)
				.then(res => {
					expect(res.error.text).toBe('error: path or content not found');
				});
		});
	});
	describe('/api/articles/:article_id', () => {
		test('status:200 returns a single object', () => {
			return request(app)
				.get('/api/articles/1')
				.expect(200)
                .then(res => {
					expect(res.body).toBeInstanceOf(Object);
				});
		});
		test('status:200 returns a object with the required properties', () => {
			return request(app)
				.get('/api/articles/1')
				.expect(200)
				.then(res => {
					expect(res._body).toEqual(
						expect.objectContaining({
							author: expect.any(String),
							title: expect.any(String),
							article_id: expect.any(Number),
							body: expect.any(String),
							topic: expect.any(String),
							created_at: expect.any(String),
							votes: expect.any(Number),
						}),
					);
				});
        });
        test('status:404 no content', () => {
            return request(app)
                .get('/api/articles/99999')
                .expect(404)
                .then(res => { expect(res.error.text).toBe('error: path or content not found')})
        });
        test('status:500 protected from sql injection', () => {
            return request(app)
                .get('/api/articles/DELETE FROM articles')
                .expect(500)
                .then(res => { expect(res.error.text).toBe("Internal Server Error")})
        })
	});
});
