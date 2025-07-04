import express from 'express';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get subscription plans
router.get('/plans', (req, res) => {
  const plans = [
    {
      name: 'Free',
      price: 0,
      monthly_requests: 50,
      features: ['Basic code generation', 'Community support']
    },
    {
      name: 'Pro',
      price: 20,
      monthly_requests: 1000,
      features: ['Advanced features', 'Figma-to-React', 'Priority support', 'Database design']
    },
    {
      name: 'Enterprise',
      price: 40,
      monthly_requests: -1, // Unlimited
      features: ['Unlimited requests', 'All premium features', 'Custom models', 'Team collaboration', 'Dedicated support']
    }
  ];
  
  res.json({ plans });
});

// Get user subscription
router.get('/current', authMiddleware, (req, res) => {
  res.json({ message: 'Current subscription endpoint' });
});

export { router as subscriptionRoutes };
