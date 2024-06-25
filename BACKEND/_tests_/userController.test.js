import request from 'supertest';
import app from '../app.js';
import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';

jest.mock('../models/userModel.js');
jest.mock('jsonwebtoken');

describe('UserController', () => {
  it('should register a new user', async () => {
    const userData = { email: 'test@example.com', name: 'John Doe', age: 30, city: 'NY', zipCode: '10001', password: 'password' };
    User.create.mockResolvedValue(userData);
    jwt.sign.mockReturnValue('mockToken');

    const res = await request(app)
      .post('/worko/user')
      .send(userData);

    expect(res.statusCode).toEqual(201);
    expect(res.body.newUser).toEqual(userData);
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('should login a user', async () => {
    const userData = { email: 'test@example.com', password: 'password' };
    
    // Mock any necessary setup for authentication or user creation
    
    const res = await request(app).post('/login').send(userData);

    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeDefined();
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('should get all users', async () => {
    const users = [{ name: 'John Doe' }];
    User.find.mockReturnValue({ where: jest.fn().mockResolvedValue(users) });

    const res = await request(app).get('/worko/user');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('John Doe');
  });

  it('should update a user', async () => {
    const user = { name: 'John Doe' };
    User.findByIdAndUpdate.mockResolvedValue(user);

    const res = await request(app)
      .put('/worko/user/1')
      .send({ name: 'Jane Doe' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('John Doe');
  });

  it('should delete a user', async () => {
    const user = { name: 'John Doe', isDeleted: true };
    User.findByIdAndUpdate.mockResolvedValue(user);

    const res = await request(app).delete('/worko/user/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.isDeleted).toBe(true);
  });
});
