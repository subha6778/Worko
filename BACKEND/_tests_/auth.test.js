import jwt from 'jsonwebtoken';
import { isAuthenticated } from '../middlewares/auth.js';

jest.mock('jsonwebtoken');

describe('AuthMiddleware', () => {
  // Helper function to mock the response object
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    res.send = jest.fn();
    return res;
  };

  it('should authenticate user with valid token', () => {
    const req = {
      cookies: {
        token: 'mockToken',
      },
    };
    const res = mockResponse();
    const next = jest.fn();
  
    // Mocking jwt.verify to return a valid user id
    jwt.verify.mockReturnValue({ id: '1' });
  
    isAuthenticated(req, res, next);
  
    // Assertions
    expect(req.user).toEqual({ id: '1' });
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
  
  it('should return error for missing token', () => {
    const req = { cookies: {} };
    const res = mockResponse();
    const next = jest.fn();

    isAuthenticated(req, res, next);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Authorization failed: Token missing' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return error for invalid token', () => {
    const req = { cookies: { token: 'invalidToken' } };
    const res = mockResponse();
    const next = jest.fn();

    // Mocking jwt.verify to throw an error for an invalid token
    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    isAuthenticated(req, res, next);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Authorization failed: Invalid token' });
    expect(next).not.toHaveBeenCalled();
  });
});
