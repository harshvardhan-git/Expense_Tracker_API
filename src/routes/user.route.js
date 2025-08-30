import { Router } from "express";
import * as UserController from '../controllers/user.controller.js';
import { AuthenticateToken } from '../middlewares/auth.js';

const userRoutes = Router();


userRoutes.post('/token', AuthenticateToken , UserController.token);
userRoutes.post('/add_user', AuthenticateToken , UserController.create_user);
userRoutes.post('/login_user', AuthenticateToken , UserController.login_user);
userRoutes.put('/update_user/:id', AuthenticateToken , UserController.update_user);
userRoutes.put('/update_user_password/:id', AuthenticateToken , UserController.update_user_password);
userRoutes.get('/get_all_user', AuthenticateToken , UserController.get_all_user);
userRoutes.get('/get_specific_user/:id', AuthenticateToken , UserController.get_specific_user);
userRoutes.delete('/delete_user/:id', AuthenticateToken , UserController.delete_user);



export default userRoutes;
