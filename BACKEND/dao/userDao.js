import { User } from "../models/userModel.js";


export const createUser_Dao = async (userData) => {
  return await User.create(userData);
};

export const findUserById_Dao = async (userId) => {
  return await User.findOne({ _id: userId, isDeleted: false });
};

export const findAllUsers_Dao = async () => {
  return await User.find().where({ isDeleted: false });
};

export const updateUser_Dao = async (userId, userData) => {
  return await User.findByIdAndUpdate(userId, userData, { new: true });
};

export const softDeleteUser_Dao = async (userId) => {
  return await User.findByIdAndUpdate(userId, { isDeleted: true });
};


