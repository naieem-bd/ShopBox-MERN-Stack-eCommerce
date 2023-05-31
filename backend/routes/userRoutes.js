import express from 'express';
const router = express.Router();
import { authUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

// user login
router.post('/login', authUser);

// get a user profile
router.route('/profile').get(protect, getUserProfile);

export default router;
