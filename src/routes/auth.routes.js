import express from 'express';
import authController from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register' , authController.register);
router.post('/login' , authController.login );
router.get('/profile' , authMiddleware , authController.getProfile);
router.get('/update-profile' , authMiddleware , authController.updateProfile);
router.post('/logout' , authController.logout);
router.put('/update-password' , authMiddleware , authController.changePassword);
 


export default router ; 