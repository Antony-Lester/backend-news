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
			return request(app).get('/api/topic').expect(404);
		});
	});
});
