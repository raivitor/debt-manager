import request from 'supertest';
import app from '../server';

const debt = {
  idUser: 1,
  reason: 'Falta de money',
  date: '2020-05-19T00:00:00.000Z',
  value: '19.9'
};
let id = 1;
describe('Debts routes optimal case', () => {
  it('should create a new debt', async () => {
    const res = await request(app).post('/api/debt').send(debt);
    id = res.body.id;
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should return the first debt', async () => {
    const res = await request(app).get('/api/debt/' + id);
    const debtRes = {
      idUser: res.body.idUser,
      reason: res.body.reason,
      date: res.body.date,
      value: res.body.value
    };
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toBe(id);

    expect(debtRes).toStrictEqual(debt);
  });

  it('should return all debts', async () => {
    const res = await request(app).get('/api/debt');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  it('shoud update a debt', async () => {
    debt.reason = 'Falta de dinheiro';
    const res = await request(app)
      .put('/api/debt/' + id)
      .send(debt);
    expect(res.statusCode).toEqual(200);
    expect(res.body.reason).toBe('Falta de dinheiro');
  });

  it('shoud delete a debt', async () => {
    const res = await request(app).delete('/api/debt/' + id);
    expect(res.statusCode).toEqual(204);
  });
});

describe('Debts routes others cases', () => {
  it('shoud return 422 when id is not number [get]', async () => {
    const res = await request(app).get('/api/debt/asd');
    expect(res.statusCode).toEqual(422);
  });

  it('shoud return 422 when id is not number [put]', async () => {
    const res = await request(app).put('/api/debt/asd');
    expect(res.statusCode).toEqual(422);
  });

  it('shoud return 422 when id is not number [delete]', async () => {
    const res = await request(app).delete('/api/debt/qwe');
    expect(res.statusCode).toEqual(422);
  });

  it('shoud return 422 when no has data in post', async () => {
    const res = await request(app).post('/api/debt').send({});
    expect(res.statusCode).toEqual(422);
  });
});
