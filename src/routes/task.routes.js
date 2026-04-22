import express from 'express';
import taskController from '../controllers/task.controller.js';
import authMiddelware from '../middlewares/auth.middleware';
import validateTasks from '../utils/validators.js';

const router = express.Router();
router.use(authMiddelware);

router.post('/' , validateTasks , taskController.createTask);
router.get('/' , taskController.getAllTasks);
router.put('/:id' , validateTasks , taskController.updateTask);
router.delete("/:id" , taskController.deleteTaks);

export default router ; 

