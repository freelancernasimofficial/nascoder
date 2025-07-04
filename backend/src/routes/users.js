import express from 'express';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'User profile endpoint' });
});

export { router as userRoutes };
