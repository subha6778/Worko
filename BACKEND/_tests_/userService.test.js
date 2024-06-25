import { createUser_service, getUserById_service, getAllUsers_service, updateUser_service, deleteUser_service } from '../services/userService.js';
import { User } from '../models/userModel.js';
import setupTestDB from './setupTestDB.js';

jest.mock('../models/userModel.js');

setupTestDB();

describe('UserService', () => {
  it('should create a new user', async () => {
    const userData = { email: 'test@example.com', name: 'John Doe', age: 30, city: 'NY', zipCode: '10001', password: 'password' };
    User.create.mockResolvedValue(userData);

    const result = await createUser_service(userData);
    expect(result).toEqual(userData);
    expect(User.create).toHaveBeenCalledWith(userData);
  });

  it('should throw error on user creation failure', async () => {
    const userData = { email: 'test@example.com', name: 'John Doe' };
    const errorMessage = 'Email already exists'; // Mocked error message
    User.create.mockRejectedValue(new Error(errorMessage));
  
    await expect(createUser_service(userData)).rejects.toThrow(errorMessage);
    expect(User.create).toHaveBeenCalledWith(userData);
  });
  

  it('should get a user by ID', async () => {
    const mockUser = { _id: '1', name: 'John Doe' };
    User.findOne.mockResolvedValue(mockUser);

    const userId = '1';
    const result = await getUserById_service(userId);

    expect(result).toEqual(mockUser);
    expect(User.findOne).toHaveBeenCalledWith({ _id: userId });
  });

  it('should return null if user not found by ID', async () => {
    User.findOne.mockResolvedValue(null);

    const userId = 'invalid_id';
    const result = await getUserById_service(userId);

    expect(result).toBeNull();
    expect(User.findOne).toHaveBeenCalledWith({ _id: userId });
  });

  it('should get all users', async () => {
    const mockUsers = [{ name: 'John Doe' }, { name: 'Jane Doe' }];
    User.find.mockReturnValue({ where: jest.fn().mockResolvedValue(mockUsers) });

    const result = await getAllUsers_service();
    expect(result).toEqual(mockUsers);
    expect(User.find).toHaveBeenCalledWith({ isDeleted: false });
  });

  it('should update a user', async () => {
    const mockUpdatedUser = { _id: '1', name: 'Jane Doe', age: 32, city: 'LA', zipCode: '90001' };
    User.findByIdAndUpdate.mockResolvedValue(mockUpdatedUser);

    const userId = '1';
    const updateData = { name: 'Jane Doe', age: 32, city: 'LA', zipCode: '90001' };
    const result = await updateUser_service(userId, updateData);

    expect(result).toEqual(mockUpdatedUser);
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(userId, updateData, { new: true });
  });

  it('should soft delete a user', async () => {
    const mockDeletedUser = { _id: '1', name: 'John Doe', isDeleted: true };
    User.findByIdAndUpdate.mockResolvedValue(mockDeletedUser);

    const userId = '1';
    const result = await deleteUser_service(userId);

    expect(result).toEqual(mockDeletedUser);
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(userId, { isDeleted: true });
  });
});
