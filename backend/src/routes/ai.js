import express from 'express';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// AI chat endpoint
router.post('/chat', authMiddleware, (req, res) => {
  res.json({ message: 'AI chat endpoint' });
});

// Code generation endpoint
router.post('/generate-code', authMiddleware, (req, res) => {
  res.json({ message: 'Code generation endpoint' });
});

export { router as aiRoutes };
