import jwt from 'jsonwebtoken';
import { Database } from '../models/database.js';

const db = new Database();

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'nascoder-secret-key');
    
    req.user = decoded;
    next();
    
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    return res.status(500).json({ error: 'Authentication error' });
  }
};

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'nascoder-secret-key');
    const user = await db.findUserById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

export const requireAdmin = (req, res, next) => {
  if (!req.user || !req.user.is_admin) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

export const requireSubscription = (requiredPlan) => {
  return (req, res, next) => {
    const userPlan = req.user.subscription;
    
    const planHierarchy = {
      'Free': 1,
      'Pro': 2,
      'Enterprise': 3
    };
    
    if (planHierarchy[userPlan] >= planHierarchy[requiredPlan]) {
      next();
    } else {
      res.status(403).json({ 
        error: 'Subscription upgrade required',
        required: requiredPlan,
        current: userPlan
      });
    }
  };
};
