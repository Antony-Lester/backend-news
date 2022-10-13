const app = require('../app');
const request = require('supertest');
const db = require(`../db/connection`);
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');



beforeEach(() => seed(testData));
afterAll(() => {
	if (db.end) db.end();
});
describe('GET:', () => {
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
				.then(({ body }) => {
					expect(body.msg).toBe('Not found');
				});
		});
	});
	describe('/api/articles', () => { 
		test('status:200 returns a array of objects', () => {
			return request(app)
				.get('/api/articles')
				.expect(200)
				.then(res => {
					expect(res.body).toBeInstanceOf(Array);
					res.body.forEach(article => expect(article).toBeInstanceOf(Object))
				});
		 })
		test('status:200 the objects contain the required property', () => {
			return request(app)
				.get('/api/articles')
				.expect(200)
				.then(res => {res.body.forEach(() => {
					expect.objectContaining({
						author: expect.any(String),
						title: expect.any(String),
						article_id: expect.any(Number),
						topic: expect.any(String),
						body: expect.any(String),
						created_at: expect.any(Number),
						votes: expect.any(Number),
						comment_count: expect.any(Number),
						})
					})
				});
		})
		test('status:200 the array should be sorted by date descending as default', () => {
			return request(app)
				.get('/api/articles')
				.expect(200)
				.then(res => {
					expect(res._body).toBeSorted({ descending: true })
				});
		})
		describe('queries', () => {
			test('status:200 should accept "topic" and filters results by the given value', () => {
				return request(app)
				.get('/api/articles?topic=mitch')
				.expect(200)
					.then(res => {
						expect(res.body.length).toBe(4)
						res.body.forEach((article) => { 
							expect(article.topic).toBe('mitch')
						})
				});
			})
			test('status:404 should return error if topic value not in database', () => {
				return request(app)
				.get('/api/articles?topic=apple')
				.expect(404)
					.then(({ body }) => {
					expect(body.msg).toEqual('Not found');
				});
			})
			test('status:200 should sort by given category defaulting to descending order', () => { 
				return request(app)
				.get('/api/articles?topic=mitch&sort_by=title')
				.expect(200)
					.then(res => {
						expect(res.body.length).toBe(4)
						expect(res.body).toBeSortedBy('title', {descending: true});
				});
			})
			test('status:200 should sort by given category in descending order when specified', () => {
				return request(app)
				.get('/api/articles?topic=mitch&sort_by=title&order=des')
				.expect(200)
					.then(res => {
						expect(res.body.length).toBe(4)
						expect(res.body).toBeSortedBy('title', {descending: true});
				});
			})
			test('status:200 should sort by given category in ascending order when specified', () => { 
				return request(app)
				.get('/api/articles?topic=mitch&sort_by=title&order=asc')
				.expect(200)
					.then(res => {
						expect(res.body.length).toBe(4)
						expect(res.body).toBeSortedBy('title', {descending: false});
				});
			})
			test('status:200 should return sort order as descending if order value is invalid', () => { 
				return request(app)
				.get('/api/articles?sort_by=title&order=apple')
				.expect(200)
				.then(res => {
					expect(res.body).toBeSortedBy('title', {descending: true});
			});
			})
			test('status:400 should return error if sort_by value not in database/invalid', () => { 
				return request(app)
				.get('/api/articles?sort_by=apple')
				.expect(400)
				.then(({ body }) => {
					expect(body).toEqual({ msg: 'Bad request' });
				});
			})
		 })
	})
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
				.then(({ body }) => {
					expect(body.article_id).toBe(1);
					expect(body.title).toBe('Living in the shadow of a great man');
					expect(body.topic).toBe('mitch');
					expect(body.author).toBe('butter_bridge');
					expect(body.body).toBe('I find this existence challenging')
					expect(body.created_at).toBe('2020-07-09T20:11:00.000Z');
					expect(body.votes).toBe(100);
				});
		});
		test('status:200 returns a object with a comment counter', () => {
			return request(app)
				.get('/api/articles/1')
				.expect(200)
				.then(({ body }) => {
					expect(body.comment_count).toBe(11)
				});
		})
		test('status:400 protected from sql injection', () => {
			return request(app)
				.get('/api/articles/DELETE FROM articles')
				.expect(400)
				.then(({ body }) => {
					expect(body.msg).toBe('Bad request');
				});
		});
		test('status:404 no content', () => {
			return request(app)
				.get('/api/articles/99999')
				.expect(404)
				.then(({ body }) => {
					expect(body.msg).toEqual('Not found');
				});
		});
		describe('/comments', () => {
			test('status:200 returns the comment objects for the requested article with the required properties', () => {
				return request(app)
					.get('/api/articles/1/comments')
					.expect(200)
					.then((comments) => {
						comments._body.forEach(comment => {
							expect(comment).toEqual(
								expect.objectContaining({
									comment_id: expect.any(Number),
									votes: expect.any(Number),
									created_at: expect.any(String),
									author: expect.any(String),
									body: expect.any(String)
							}))
						 })
						
					});
			 })
			test('status:200 returns array of comment objects sorted by created_at descending', () => {
				return request(app)
					.get('/api/articles/1/comments')
					.expect(200)
					.then((comments) => {
						expect(comments._body).toBeSorted({ descending: true })
					});
			})
			test('status:404 returns a empty array if article dose not have any comments', () => {
				return request(app)
					.get('/api/articles/2/comments')
					.expect(404)
					.then(({ body }) => {
						expect(body.msg).toEqual('Not found');
					});
			})
			test('status:404 no content', () => {
				return request(app)
				.get('/api/articles/99999/comments')
				.expect(404)
				.then(({ body }) => {
					expect(body.msg).toEqual('Not found');
				});
			})
		})
	});
	describe('/api/users', () => {
		test('status:200 returns a single array', () => {
			return request(app)
				.get('/api/users')
				.expect(200)
				.then(res => {
					expect(res._body).toBeInstanceOf(Array);
				});
		});
		test('status:200 returns a array of objects containing property: username, name & avatar_url', () => {
			return request(app)
				.get('/api/users')
				.expect(200)
				.then(res => {
					expect(res._body.length).toBe(4);
					res._body.forEach(news => {
						expect(news).toEqual(
							expect.objectContaining({
								username: expect.any(String),
								name: expect.any(String),
								avatar_url: expect.any(String),
							}),
						);
					});
				});
		});
		test('status:404 Not Found', () => {
			return request(app)
				.get('/api/userss')
				.expect(404)
				.then(({ body }) => {
					expect(body.msg).toBe('Not found');
				});
		});
	});
});
describe('PATCH:', () => {
	describe('/api/articles/:article_id', () => {
		test('status:202 returns a article with updated values when incremented', () => {
			return request(app)
				.patch('/api/articles/1')
				.send({ inc_votes: 1 })
				.expect(202)
				.then(res => {
					expect(res._body).toEqual({
						article_id: 1,
						title: 'Living in the shadow of a great man',
						topic: 'mitch',
						author: 'butter_bridge',
						body: 'I find this existence challenging',
						created_at: '2020-07-09T20:11:00.000Z',
						votes: 101,
					});
				});
		});
		test('status:202 returns a article with updated values when decremented', () => {
			return request(app)
				.patch('/api/articles/3')
				.send({ inc_votes: -100 })
				.expect(202)
				.then(res => {
					expect(res._body).toEqual({
						article_id: 3,
						title: 'Eight pug gifs that remind me of mitch',
						topic: 'mitch',
						author: 'icellusedkars',
						body: 'some gifs',
						created_at: '2020-11-03T09:12:00.000Z',
						votes: -100,
					});
				});
		});
		test('status:304 when passed data is missing property', () => {
			return request(app)
				.patch('/api/articles/3')
				.send({ inc_vote: 1 })
				.expect(304)
				.then(({ res }) => {
					expect(res.statusMessage).toEqual('Not Modified');
				});
		});
		test('status:304 when the property value is not valid', () => {
			return request(app)
				.patch('/api/articles/3')
				.send({ inc_votes: 'TEST' })
				.expect(304)
				.then(({ res }) => {
					expect(res.statusMessage).toEqual('Not Modified');
				});
		});
	});
});
describe('POST:', () => { 
	describe('/api/articles/:article_id/comments', () => { 
		test('status:201 assigns new comment to database from a known user and returns comment', () => {
			return request(app)
				.post('/api/articles/1/comments')
				.send({
					username: 'butter_bridge',
					body: 'test comment'
				})
				.expect(201)
				.then(res => {
					expect(res._body).toEqual(
						expect.objectContaining({
							article_id: 1,
							author: 'butter_bridge',
							body: 'test comment',
							comment_id: 19,
							created_at: expect.any(String),
							votes: 0
						})
					)
				});
		})
		test('status:400 rejects a comment without a valid comment', () => {
			return request(app)
				.post('/api/articles/1/comments')
				.send({
					username: 'butter_bridge',
					body: 8
				})
				.expect(400)
				.then(res => { expect(res._body).toEqual({ msg: "Bad request" }) })
		})
		test('status:400 returns a error when the article_id is not valid', () => { 
			return request(app)
				.post('/api/articles/apple/comments')
				.send({
					username: 'butter_bridge',
					body: 'test comment'
				})
				.expect(400)
				.then(res => {expect(res._body).toEqual({ msg: "Bad request" })});
		})
		test('status:404 returns a error when the user dose not exist', () => {
			return request(app)
				.post('/api/articles/1/comments')
				.send({
					username: 'unknown_user',
					body: 'test comment'
				})
				.expect(404)
				.then(res => {expect(res._body).toEqual({ msg: 'Not found' })});
		})
		test('status:404 returns a error when the article_id dose not exits', () => { 
			return request(app)
				.post('/api/articles/99999999/comments')
				.send({
					username: 'butter_bridge',
					body: 'test comment'
				})
				.expect(404)
				.then(res => {expect(res._body).toEqual({ msg: 'Not found' })});
		})
	})
})
