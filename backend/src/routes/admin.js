import express from 'express';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { Database } from '../models/database.js';

const router = express.Router();
const db = new Database();

// Admin middleware - require admin access
router.use(authenticateToken);
router.use(requireAdmin);

// Get admin statistics
router.get('/stats', async (req, res) => {
  try {
    const users = await db.getAllUsers();
    const subscriptions = await db.getAllSubscriptions();
    
    const totalUsers = users.length;
    const activeSubscriptions = subscriptions.filter(sub => sub.is_active).length;
    
    // Calculate monthly revenue
    const monthlyRevenue = subscriptions
      .filter(sub => sub.is_active)
      .reduce((total, sub) => total + (sub.price_per_month || 0), 0);
    
    // Mock API requests count (in production, this would come from usage tracking)
    const apiRequests = users.reduce((total, user) => {
      return total + (user.requests_used || 0);
    }, 0);

    res.json({
      totalUsers,
      activeSubscriptions,
      monthlyRevenue,
      apiRequests
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ error: 'Failed to fetch admin statistics' });
  }
});

// Get all users for admin management
router.get('/users', async (req, res) => {
  try {
    const users = await db.getAllUsers();
    const usersWithUsage = await Promise.all(
      users.map(async (user) => {
        const usage = await db.getUserUsage(user.id);
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          subscription_plan: user.subscription_plan,
          requests_used: usage?.requests_used || 0,
          created_at: user.created_at,
          is_active: user.is_active !== false
        };
      })
    );

    res.json(usersWithUsage);
  } catch (error) {
    console.error('Admin users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// User management actions
router.post('/users/:userId/suspend', async (req, res) => {
  try {
    const { userId } = req.params;
    await db.updateUser(userId, { is_active: false });
    res.json({ message: 'User suspended successfully' });
  } catch (error) {
    console.error('Suspend user error:', error);
    res.status(500).json({ error: 'Failed to suspend user' });
  }
});

router.post('/users/:userId/activate', async (req, res) => {
  try {
    const { userId } = req.params;
    await db.updateUser(userId, { is_active: true });
    res.json({ message: 'User activated successfully' });
  } catch (error) {
    console.error('Activate user error:', error);
    res.status(500).json({ error: 'Failed to activate user' });
  }
});

router.post('/users/:userId/reset-usage', async (req, res) => {
  try {
    const { userId } = req.params;
    await db.resetUserUsage(userId);
    res.json({ message: 'User usage reset successfully' });
  } catch (error) {
    console.error('Reset usage error:', error);
    res.status(500).json({ error: 'Failed to reset user usage' });
  }
});

export default router;
