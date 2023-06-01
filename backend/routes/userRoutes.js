import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

// reg a user
router.route('/').post(registerUser);

// user login
router.post('/login', authUser);

// get a user profile
router.route('/profile').get(protect, getUserProfile);

export default router;
