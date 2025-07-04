'use client';

import { useState, useEffect } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  subscription_plan: string;
}

interface UserDashboardProps {
  user: User;
}

interface Usage {
  requests_used: number;
  requests_remaining: number;
  last_request: string | null;
}

export function UserDashboard({ user }: UserDashboardProps) {
  const [usage, setUsage] = useState<Usage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsage();
  }, []);

  const fetchUsage = async () => {
    try {
      const token = localStorage.getItem('nascoder_token');
      const response = await fetch('/api/user/usage', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const usageData = await response.json();
        setUsage(usageData);
      }
    } catch (error) {
      console.error('Failed to fetch usage:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPlanDetails = (plan: string) => {
    switch (plan) {
      case 'Free':
        return { limit: 50, price: '$0', color: 'text-gray-600' };
      case 'Pro':
        return { limit: 1000, price: '$20', color: 'text-blue-600' };
      case 'Enterprise':
        return { limit: -1, price: '$40', color: 'text-purple-600' };
      default:
        return { limit: 50, price: '$0', color: 'text-gray-600' };
    }
  };

  const planDetails = getPlanDetails(user.subscription_plan);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your nascoder subscription and usage</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
              <div className={`text-2xl font-bold ${planDetails.color} mt-2`}>
                {user.subscription_plan}
              </div>
              <p className="text-gray-600 text-sm mt-1">
                {planDetails.price}/month
              </p>
            </div>
            <div className="text-3xl">
              {user.subscription_plan === 'Free' && '🆓'}
              {user.subscription_plan === 'Pro' && '💎'}
              {user.subscription_plan === 'Enterprise' && '🚀'}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Usage This Month</h3>
              <div className="text-2xl font-bold text-green-600 mt-2">
                {loading ? '...' : usage?.requests_used || 0}
              </div>
              <p className="text-gray-600 text-sm mt-1">
                {planDetails.limit === -1 ? 'Unlimited' : `of ${planDetails.limit} requests`}
              </p>
            </div>
            <div className="text-3xl">📊</div>
          </div>
          {!loading && usage && planDetails.limit > 0 && (
            <div className="mt-4">
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${Math.min((usage.requests_used / planDetails.limit) * 100, 100)}%`
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {usage.requests_remaining} requests remaining
              </p>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Account Status</h3>
              <div className="text-2xl font-bold text-green-600 mt-2">Active</div>
              <p className="text-gray-600 text-sm mt-1">All systems operational</p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-bold mb-4">Account Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <div className="text-lg text-gray-900">{user.username}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="text-lg text-gray-900">{user.email}</div>
          </div>
        </div>
      </div>

      {/* CLI Installation */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-bold mb-4">CLI Installation</h3>
        <p className="text-gray-600 mb-4">
          Install nascoder CLI to start using AI assistance in your development workflow:
        </p>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          <div className="mb-2 text-gray-400"># Install nascoder globally</div>
          <div className="text-white">npm install -g nascoder</div>
          <div className="mt-3 mb-2 text-gray-400"># Login with your credentials</div>
          <div className="text-white">nascoder auth login</div>
          <div className="mt-3 mb-2 text-gray-400"># Start conversational session</div>
          <div className="text-white">nascoder</div>
        </div>
      </div>

      {/* Subscription Management */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Subscription Management</h3>
        <div className="space-y-4">
          {user.subscription_plan === 'Free' && (
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Upgrade Your Plan</h4>
              <p className="text-blue-800 mb-4">
                Get more requests and advanced features with Pro or Enterprise plans.
              </p>
              <div className="space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Upgrade to Pro ($20/month)
                </button>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                  Go Enterprise ($40/month)
                </button>
              </div>
            </div>
          )}

          {user.subscription_plan === 'Pro' && (
            <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Upgrade to Enterprise</h4>
              <p className="text-purple-800 mb-4">
                Get unlimited requests and premium features with Enterprise plan.
              </p>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                Upgrade to Enterprise ($40/month)
              </button>
            </div>
          )}

          <div className="border-t pt-4">
            <button className="text-red-600 hover:text-red-800 text-sm">
              Cancel Subscription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
