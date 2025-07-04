import express from 'express';
import { authMiddleware, requireSubscription } from '../middleware/auth.js';

const router = express.Router();

// Admin endpoints (future web dashboard)
router.get('/users', authMiddleware, requireSubscription('Enterprise'), (req, res) => {
  res.json({ message: 'Admin users endpoint' });
});

router.get('/analytics', authMiddleware, requireSubscription('Enterprise'), (req, res) => {
  res.json({ message: 'Admin analytics endpoint' });
});

export { router as adminRoutes };
