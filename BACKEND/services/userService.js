import { createUser_Dao,findUserById_Dao ,findAllUsers_Dao,updateUser_Dao,softDeleteUser_Dao} from "../dao/userDao.js";

export const createUser_service = async (userData) => {
  return await createUser_Dao(userData);
};

export const getUserById_service = async (userId) => {
  return await findUserById_Dao(userId);
};

export const getAllUsers_service = async () => {
  return await findAllUsers_Dao();
};

export const updateUser_service = async (userId, userData) => {
  return await updateUser_Dao(userId, userData);
};

export const deleteUser_service = async (userId) => {
  return await softDeleteUser_Dao(userId);
};


