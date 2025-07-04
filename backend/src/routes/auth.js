import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Login endpoint
router.post('/login', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const db = req.app.locals.db;

    // Find user
    const user = await db.findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        username: user.username,
        subscription: user.subscription_plan 
      },
      process.env.JWT_SECRET || 'nascoder-secret-key',
      { expiresIn: '7d' }
    );

    // Get user subscription details
    const subscription = await db.getUserSubscription(user.id);

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        subscription_plan: user.subscription_plan,
        created_at: user.created_at
      },
      subscription
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Register endpoint (for future use)
router.post('/register', [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    const db = req.app.locals.db;

    // Check if user already exists
    const existingUser = await db.findUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const existingEmail = await db.findUserByEmail(email);
    if (existingEmail) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const userId = await db.createUser({
      username,
      email,
      password_hash: passwordHash,
      subscription_plan: 'Free'
    });

    // Create default subscription
    await db.createSubscription({
      user_id: userId,
      plan_name: 'Free',
      monthly_requests: 50,
      price_per_month: 0.00,
      features: JSON.stringify({
        basic_code_generation: true,
        community_support: true
      })
    });

    res.status(201).json({
      message: 'User created successfully',
      user: { id: userId, username, email }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user info
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const user = await db.findUserById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const subscription = await db.getUserSubscription(user.id);
    const usage = await db.getUserUsage(user.id);

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      subscription_plan: user.subscription_plan,
      created_at: user.created_at,
      subscription,
      usage
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout endpoint (client-side token removal)
router.post('/logout', authMiddleware, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

export { router as authRoutes };
