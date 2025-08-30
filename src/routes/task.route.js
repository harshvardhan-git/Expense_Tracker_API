import { Router } from "express";
import * as TaskController from '../controllers/task.controller.js';
import { AuthenticateToken } from '../middlewares/auth.js';

const taskRoutes = Router();


taskRoutes.post('/add_task', AuthenticateToken , TaskController.create_task);
taskRoutes.put('/update_task/:id', AuthenticateToken , TaskController.update_task);
taskRoutes.get('/get_all_task', AuthenticateToken , TaskController.get_all_task);
taskRoutes.get('/get_specific_task/:id', AuthenticateToken , TaskController.get_specific_task);
taskRoutes.delete('/delete_task/:id', AuthenticateToken ,TaskController.delete_task);


export default taskRoutes;
