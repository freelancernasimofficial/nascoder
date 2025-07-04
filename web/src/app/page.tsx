'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [terminalText, setTerminalText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const codeLines = [
    '> Initializing nascoder...',
    '> Loading AI models...',
    '> Connecting to development matrix...',
    '> Ready to transform your code ✓'
  ];

  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;
    
    const typeWriter = () => {
      if (currentLine < codeLines.length) {
        if (currentChar < codeLines[currentLine].length) {
          setTerminalText(prev => prev + codeLines[currentLine][currentChar]);
          currentChar++;
          setTimeout(typeWriter, 50);
        } else {
          setTerminalText(prev => prev + '\n');
          currentLine++;
          currentChar = 0;
          setTimeout(typeWriter, 500);
        }
      }
    };

    typeWriter();

    // Blinking cursor
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="fixed inset-0 opacity-10">
        <div className="matrix-rain"></div>
      </div>

      {/* Terminal Header */}
      <div className="relative z-10">
        <div className="bg-gray-900 border-b border-green-500 px-4 py-2 flex items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="ml-4 text-green-400 text-sm">
            nascoder@terminal:~$ AI Development Assistant
          </div>
        </div>

        {/* Hero Terminal Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-black border border-green-500 rounded-lg p-6 mb-8 shadow-2xl shadow-green-500/20">
            <div className="mb-4">
              <pre className="text-green-400 whitespace-pre-wrap">
{`
███╗   ██╗ █████╗ ███████╗ ██████╗ ██████╗ ██████╗ ███████╗██████╗ 
████╗  ██║██╔══██╗██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔════╝██╔══██╗
██╔██╗ ██║███████║███████╗██║     ██║   ██║██║  ██║█████╗  ██████╔╝
██║╚██╗██║██╔══██║╚════██║██║     ██║   ██║██║  ██║██╔══╝  ██╔══██╗
██║ ╚████║██║  ██║███████║╚██████╗╚██████╔╝██████╔╝███████╗██║  ██║
╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝
`}
              </pre>
            </div>
            
            <div className="text-cyan-400 mb-4">
              <div className="typing-animation">
                {terminalText}
                <span className={`${showCursor ? 'opacity-100' : 'opacity-0'}`}>█</span>
              </div>
            </div>

            <div className="border-t border-green-500 pt-4">
              <div className="text-yellow-400 mb-2">// AI-Powered Development Assistant</div>
              <div className="text-white mb-4">
                Transform your coding experience with intelligent AI assistance.
                From Figma designs to full-stack applications - nascoder is your coding companion.
              </div>
              
              <div className="bg-gray-900 border border-cyan-500 rounded p-4 mb-4">
                <div className="text-cyan-400 mb-2">$ Quick Start:</div>
                <div className="text-green-400">
                  <div className="mb-1">npm install -g nascoder</div>
                  <div className="mb-1">nascoder auth login</div>
                  <div>nascoder</div>
                </div>
              </div>
            </div>
          </div>

          {/* Code Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-900 border border-purple-500 rounded-lg p-6 hover:shadow-lg hover:shadow-purple-500/20 transition-all">
              <div className="text-purple-400 text-2xl mb-3">{'<Figma/>'}</div>
              <div className="text-cyan-400 font-bold mb-2">Design → Code</div>
              <div className="text-gray-300 text-sm mb-4">
                Convert Figma designs to production-ready React components instantly
              </div>
              <div className="bg-black border border-purple-400 rounded p-2 text-xs">
                <div className="text-purple-400">// Input: Figma URL</div>
                <div className="text-green-400">// Output: React Component</div>
              </div>
            </div>

            <div className="bg-gray-900 border border-blue-500 rounded-lg p-6 hover:shadow-lg hover:shadow-blue-500/20 transition-all">
              <div className="text-blue-400 text-2xl mb-3">{'{ DB }'}</div>
              <div className="text-cyan-400 font-bold mb-2">Smart Schemas</div>
              <div className="text-gray-300 text-sm mb-4">
                Generate optimized database schemas with relationships and migrations
              </div>
              <div className="bg-black border border-blue-400 rounded p-2 text-xs">
                <div className="text-blue-400">// AI-generated schemas</div>
                <div className="text-green-400">// Auto-migrations</div>
              </div>
            </div>

            <div className="bg-gray-900 border border-orange-500 rounded-lg p-6 hover:shadow-lg hover:shadow-orange-500/20 transition-all">
              <div className="text-orange-400 text-2xl mb-3">{'⚡ Full-Stack'}</div>
              <div className="text-cyan-400 font-bold mb-2">Complete Apps</div>
              <div className="text-gray-300 text-sm mb-4">
                Build entire applications with frontend, backend, and database
              </div>
              <div className="bg-black border border-orange-400 rounded p-2 text-xs">
                <div className="text-orange-400">// Frontend + Backend</div>
                <div className="text-green-400">// Ready to deploy</div>
              </div>
            </div>
          </div>

          {/* Interactive Code Demo */}
          <div className="bg-gray-900 border border-green-500 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="text-green-400 font-bold">Live Demo Terminal</div>
              <div className="text-xs text-gray-500">Try nascoder commands</div>
            </div>
            
            <div className="bg-black border border-gray-700 rounded p-4">
              <div className="text-green-400 mb-2">user@dev:~$ nascoder</div>
              <div className="text-cyan-400 mb-2">🤖 nascoder AI Assistant activated</div>
              <div className="text-white mb-2">💬 How can I help you code today?</div>
              <div className="text-gray-400 mb-4">
                <div>• "Create a React login component"</div>
                <div>• "Design a user database schema"</div>
                <div>• "Build a REST API for todos"</div>
                <div>• "Convert this Figma to React"</div>
              </div>
              <div className="text-green-400 animate-pulse">█</div>
            </div>
          </div>

          {/* Pricing in Terminal Style */}
          <div className="bg-gray-900 border border-yellow-500 rounded-lg p-6 mb-8">
            <div className="text-yellow-400 font-bold mb-4 text-center">
              {'// Subscription Plans'} 
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              {/* Free Plan */}
              <div className="bg-black border border-gray-600 rounded p-4 hover:border-green-500 transition-colors">
                <div className="text-gray-400 mb-2">{'/* FREE TIER */'}</div>
                <div className="text-green-400 text-2xl font-bold mb-2">$0<span className="text-sm">/month</span></div>
                <div className="text-gray-300 mb-4">
                  <div>• 50 AI requests/month</div>
                  <div>• Basic code generation</div>
                  <div>• Community support</div>
                  <div>• CLI access</div>
                </div>
                <button className="w-full bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-4 rounded transition-colors">
                  git clone free-plan
                </button>
              </div>

              {/* Pro Plan */}
              <div className="bg-black border-2 border-cyan-500 rounded p-4 relative hover:shadow-lg hover:shadow-cyan-500/20">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-cyan-500 text-black px-3 py-1 rounded text-xs font-bold">
                  POPULAR
                </div>
                <div className="text-cyan-400 mb-2">{'/* PRO TIER */'}</div>
                <div className="text-cyan-400 text-2xl font-bold mb-2">$20<span className="text-sm">/month</span></div>
                <div className="text-gray-300 mb-4">
                  <div>• 1,000 AI requests/month</div>
                  <div>• Advanced features</div>
                  <div>• Figma-to-React</div>
                  <div>• Priority support</div>
                  <div>• Multiple AI models</div>
                </div>
                <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-black font-bold py-2 px-4 rounded transition-colors">
                  npm install pro-plan
                </button>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-black border border-purple-600 rounded p-4 hover:border-purple-500 transition-colors">
                <div className="text-purple-400 mb-2">{'/* ENTERPRISE */'}</div>
                <div className="text-purple-400 text-2xl font-bold mb-2">$40<span className="text-sm">/month</span></div>
                <div className="text-gray-300 mb-4">
                  <div>• Unlimited requests</div>
                  <div>• All features</div>
                  <div>• Custom AI models</div>
                  <div>• Team collaboration</div>
                  <div>• Dedicated support</div>
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors">
                  curl enterprise-plan
                </button>
              </div>
            </div>
          </div>

          {/* Installation Section */}
          <div className="bg-gray-900 border border-red-500 rounded-lg p-6 mb-8">
            <div className="text-red-400 font-bold mb-4 text-center">
              {'// Get Started - Copy & Paste'} 
            </div>
            
            <div className="bg-black border border-gray-700 rounded p-4">
              <div className="text-gray-400 mb-2"># Install nascoder globally</div>
              <div className="text-green-400 mb-4 text-lg">npm install -g nascoder</div>
              
              <div className="text-gray-400 mb-2"># Authenticate your account</div>
              <div className="text-cyan-400 mb-4 text-lg">nascoder auth login</div>
              
              <div className="text-gray-400 mb-2"># Start coding with AI</div>
              <div className="text-yellow-400 mb-4 text-lg">nascoder</div>
              
              <div className="text-green-400 text-sm">
                ✓ Installation complete in 30 seconds
              </div>
            </div>
          </div>

          {/* Footer Terminal */}
          <div className="bg-gray-900 border border-gray-600 rounded-lg p-4 text-center">
            <div className="text-gray-400 mb-2">
              {'// Built by developers, for developers'}
            </div>
            <div className="text-green-400">
              © 2025 nascoder - AI Development Assistant
            </div>
            <div className="text-cyan-400 text-sm mt-2">
              {'> Ready to transform your development workflow?'}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .matrix-rain {
          background: linear-gradient(0deg, transparent 24%, rgba(32, 194, 14, 0.05) 25%, rgba(32, 194, 14, 0.05) 26%, transparent 27%, transparent 74%, rgba(32, 194, 14, 0.05) 75%, rgba(32, 194, 14, 0.05) 76%, transparent 77%, transparent);
          background-size: 50px 50px;
          animation: matrix 20s linear infinite;
          height: 100vh;
          width: 100vw;
        }
        
        @keyframes matrix {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
        
        .typing-animation {
          white-space: pre-wrap;
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px currentColor; }
          50% { box-shadow: 0 0 20px currentColor; }
        }
        
        .border-green-500:hover {
          animation: glow 2s infinite;
        }
        
        .border-cyan-500:hover {
          animation: glow 2s infinite;
        }
        
        .border-purple-500:hover {
          animation: glow 2s infinite;
        }
      `}</style>
    </div>
  );
}
