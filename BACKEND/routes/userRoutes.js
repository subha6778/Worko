import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { listUsers ,getUser,createUser,updateUser,deleteUser,loginUser,logoutUser} from "../controllers/userController.js";

import {validateUser,validateUserPartial,validateUserId} from "../validators/userValidator.js";
const router = express.Router();


router.post("/login", loginUser);
router.post("/user/logout", isAuthenticated, logoutUser);




router.get('/user',isAuthenticated,listUsers);


router.get('/user/:userId',isAuthenticated,getUser);
router.post('/user', validateUser,createUser);
router.put('/user/:userId', isAuthenticated,validateUserId,validateUser,updateUser);
router.patch('/user/:userId',isAuthenticated,validateUserPartial,updateUser);
router.delete('/user/:userId',isAuthenticated,validateUserId, deleteUser);

export default router;
