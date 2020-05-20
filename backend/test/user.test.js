import request from 'supertest';
import app from '../server';

describe('User route', () => {
  it('should return users', async () => {
    const res = await request(app).get('/api/user');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(10);
  });
});
