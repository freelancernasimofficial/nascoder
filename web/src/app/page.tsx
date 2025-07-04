export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl mr-3">🤖</div>
              <span className="text-xl font-bold">nascoder</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#pricing" className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            🤖 nascoder
          </h1>
          <p className="text-xl mb-8">AI-Powered Conversational Development Assistant</p>
          <p className="text-lg mb-12">Transform your development workflow with intelligent AI assistance</p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-2">Figma to React</h3>
              <p>Convert designs to production-ready code instantly</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <div className="text-3xl mb-4">🗄️</div>
              <h3 className="text-xl font-bold mb-2">Database Design</h3>
              <p>Generate optimized database schemas and migrations</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Full-Stack Apps</h3>
              <p>Create complete applications with AI assistance</p>
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
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose nascoder?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2">Fast Development</h3>
              <p className="text-gray-600">Accelerate your coding with AI-powered assistance</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Smart Suggestions</h3>
              <p className="text-gray-600">Get intelligent code recommendations and optimizations</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-bold mb-2">Multiple Languages</h3>
              <p className="text-gray-600">Support for React, Node.js, Python, and more</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-2">Conversational</h3>
              <p className="text-gray-600">Natural language interface for easy interaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-bold mb-4">Free</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">$0</div>
              <p className="text-gray-600 mb-6">50 requests/month</p>
              <ul className="text-left space-y-2 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Basic code generation
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Community support
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  CLI access
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold">
                Get Started Free
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center border-2 border-blue-600 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                Popular
              </div>
              <h3 className="text-2xl font-bold mb-4">Pro</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">$20</div>
              <p className="text-gray-600 mb-6">1,000 requests/month</p>
              <ul className="text-left space-y-2 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Advanced features
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Figma-to-React conversion
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Priority support
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Multiple AI models
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold">
                Upgrade to Pro
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">$40</div>
              <p className="text-gray-600 mb-6">Unlimited requests</p>
              <ul className="text-left space-y-2 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  All features included
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Custom AI models
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Team collaboration
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Dedicated support
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Development?</h2>
          <p className="text-xl mb-8">Join thousands of developers using nascoder to build better software faster</p>
          <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-left max-w-2xl mx-auto">
            <div className="text-white">npm install -g nascoder</div>
          </div>
          <p className="mt-6 text-lg">Get started in less than 30 seconds</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-3">🤖</div>
                <span className="text-xl font-bold">nascoder</span>
              </div>
              <p className="text-gray-400">AI-powered development assistant for modern developers</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 nascoder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
