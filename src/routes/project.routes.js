import express from 'express';
import projectController from '../controllers/project.controller.js';
import authMiddelware from '../middlewares/auth.middleware.js';
import validateProject from '../middlewares/validateProject.middleware.js';

const router = express.Router();
router.use(authMiddelware);

router.post('/' , validateProject, projectController.createProject);
router.get('/' ,projectController.getAllProjects);
router.put('/:id', validateProject,projectController.updateProject);
router.delete('/:id' ,projectController.deleteProject);



export default router ; 

