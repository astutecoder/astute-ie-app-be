import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { MongoUserRepository } from '../repositories/mongo/MongoUserRepository';
import { UserService } from '../services/UserService';

export const userRouter = Router();
const userRepository = new MongoUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.get('/', userController.getAll);
userRouter.post('/add', userController.addUser);
