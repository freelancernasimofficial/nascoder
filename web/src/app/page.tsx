'use client';

import { useState, useEffect } from 'react';
import { LoginModal } from '@/components/LoginModal';
import { RegisterModal } from '@/components/RegisterModal';
import { UserDashboard } from '@/components/UserDashboard';
import { AdminDashboard } from '@/components/AdminDashboard';

interface User {
  id: number;
  username: string;
  email: string;
  subscription_plan: string;
  is_admin?: boolean;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('nascoder_token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem('nascoder_token');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('nascoder_token');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('nascoder_token', data.token);
        setUser(data.user);
        setShowLoginModal(false);
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.error || 'Login failed' };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const handleRegister = async (userData: any) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('nascoder_token', data.token);
        setUser(data.user);
        setShowRegisterModal(false);
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.error || 'Registration failed' };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('nascoder_token');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl mr-3">🤖</div>
              <span className="text-xl font-bold">nascoder</span>
              <span className="ml-2 text-sm bg-blue-700 px-2 py-1 rounded">Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm">
                    Welcome, <strong>{user.username}</strong>
                    {user.is_admin && <span className="ml-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs">ADMIN</span>}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowRegisterModal(true)}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {user ? (
        <div className="py-8">
          {user.is_admin ? (
            <AdminDashboard user={user} />
          ) : (
            <UserDashboard user={user} />
          )}
        </div>
      ) : (
        /* Hero Section */
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">
              🤖 nascoder
            </h1>
            <p className="text-xl mb-8">AI-Powered Conversational Development Assistant</p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                <div className="text-3xl mb-4">🎨</div>
                <h3 className="text-xl font-bold mb-2">Figma to React</h3>
                <p>Convert designs to production-ready code</p>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                <div className="text-3xl mb-4">🗄️</div>
                <h3 className="text-xl font-bold mb-2">Database Design</h3>
                <p>Generate optimized database schemas</p>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-2">Full-Stack Apps</h3>
                <p>Create complete applications with AI</p>
              </div>
            </div>

            {/* Installation Instructions */}
            <div className="mt-16 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Get Started in Seconds</h2>
              <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-left">
                <div className="mb-2 text-gray-400"># Install nascoder globally</div>
                <div className="text-white">npm install -g nascoder</div>
                <div className="mt-4 mb-2 text-gray-400"># Start using AI assistance</div>
                <div className="text-white">nascoder auth login</div>
                <div className="text-white">nascoder</div>
              </div>
            </div>

            {/* Pricing */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8">Subscription Plans</h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white text-gray-900 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Free</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-4">$0</div>
                  <p className="mb-4">50 requests/month</p>
                  <button
                    onClick={() => setShowRegisterModal(true)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Get Started
                  </button>
                </div>
                <div className="bg-white text-gray-900 p-6 rounded-lg border-2 border-yellow-400">
                  <div className="text-center mb-2">
                    <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                      Popular
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Pro</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-4">$20</div>
                  <p className="mb-4">1,000 requests/month</p>
                  <button
                    onClick={() => setShowRegisterModal(true)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Upgrade to Pro
                  </button>
                </div>
                <div className="bg-white text-gray-900 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-4">$40</div>
                  <p className="mb-4">Unlimited requests</p>
                  <button
                    onClick={() => setShowRegisterModal(true)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Go Enterprise
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onRegister={handleRegister}
      />
    </div>
  );
}
