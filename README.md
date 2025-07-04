# 🚀 nascoder - AI-Powered Conversational Development Assistant

nascoder is an enterprise-grade CLI tool that provides conversational AI assistance for software development.

## ✨ Features

- 🎨 **Figma to React Conversion** - Convert designs to production-ready code
- 🏗️ **Full-Stack App Generation** - Create complete applications with database schemas
- 📊 **Database Design** - Generate optimized database schemas and migrations
- 🔧 **Code Analysis & Optimization** - Improve existing code performance and quality
- 📱 **Mobile App Development** - React Native and native app generation
- ☁️ **Cloud Integration** - Seamless deployment to cloud services
- 🤖 **Multiple AI Models** - Access to various AI models via intelligent routing
- 💬 **Conversational Interface** - Natural language interaction, no complex commands
- 🔒 **Enterprise Security** - JWT authentication, role-based access, audit logging

## 🎯 Subscription Plans

| Plan | Price | Monthly Requests | Features |
|------|-------|------------------|----------|
| **Free** | $0 | 50 | Basic code generation, Community support |
| **Pro** | $20 | 1,000 | Advanced features, Figma-to-React, Priority support |
| **Enterprise** | $40/user | Unlimited | All features, Custom models, Team collaboration |

## 🚀 Quick Start

### **Installation**

#### **Option 1: Install from GitHub (Available Now)**
```bash
# Clone the repository
git clone https://github.com/freelancernasimofficial/nascoder.git
cd nascoder

# Install dependencies
cd cli && npm install && npm link
cd ../backend && npm install

# Verify installation
nascoder --version
nascoder --help
```

#### **Option 2: Install from NPM (Coming Soon)**
```bash
npm install -g nascoder
```

### **Usage**
```bash
# Check available features
nascoder features

# Login (registration required)
nascoder auth login

# Start conversational session
nascoder
# Now ask: "create a react app with typescript"
```

## 📋 Available Commands

### **Pre-Chat Commands (Limited)**
```bash
nascoder auth login          # Login to your account
nascoder auth status         # Check authentication status
nascoder auth logout         # Logout
nascoder models list         # Show available AI models
nascoder features           # Display all capabilities
nascoder version            # Show version info
```

### **Conversational Interface**
Once you run `nascoder` without arguments, you enter the conversational mode where you can:

- **Code Generation**: "create a react component for user dashboard"
- **Architecture Planning**: "design a microservices architecture for ecommerce"
- **Database Design**: "create database schema for blog application"
- **Code Optimization**: "optimize this React component for performance"
- **Figma Conversion**: "convert this figma design to react with tailwind"

## 🏗️ Architecture

```
nascoder/
├── cli/                    # Main CLI application
│   ├── src/
│   │   ├── index.js       # Entry point
│   │   ├── chat/          # Conversational engine
│   │   ├── auth/          # Authentication
│   │   ├── permissions/   # Permission system
│   │   └── ai/           # AI integration
├── backend/               # API server
│   ├── src/
│   │   ├── server.js     # Express server
│   │   ├── routes/       # API routes
│   │   ├── models/       # Database models
│   │   └── middleware/   # Auth middleware
└── docs/                  # Documentation
```

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Permission System** - Amazon Q-style permission requests
- **Role-Based Access** - Different features for different subscription tiers
- **Audit Logging** - Track all AI model usage and costs
- **Rate Limiting** - Prevent abuse and control costs
- **Input Validation** - Sanitize all user inputs

## 💰 Cost Optimization

nascoder uses intelligent model routing to minimize costs while maintaining high quality output for all development tasks.

## 🧪 Development

### **Start Development Environment**
```bash
# Terminal 1: Start backend
cd backend && npm run dev

# Terminal 2: Test CLI
cd cli && node src/index.js
```

### **Run Tests**
```bash
# Backend tests
cd backend && npm test

# CLI tests  
cd cli && npm test
```

## 📊 Usage Examples

### **Create React Application**
```
nascoder> create a modern react app with typescript, tailwind, and authentication

🤖 I'll create a complete React application for you.

📋 Planned Actions:
   • Create project directory: ./react-auth-app
   • Install React 18 with TypeScript
   • Set up Tailwind CSS
   • Create authentication components
   • Add routing with React Router
   • Set up state management

⚠️  Permission Required:
   □ Create files and directories
   □ Install npm packages

Choose permission scope:
[1] Grant for this session ✅
```

### **Convert Figma Design**
```
nascoder> convert this figma design to react component: [figma-url]

🤖 Analyzing Figma design...
   • Detected: User dashboard with sidebar navigation
   • Components: Header, Sidebar, Main content area, Data cards
   • Styling: Modern design with gradients and shadows

📋 Conversion Plan:
   • Create responsive React component
   • Use Tailwind CSS for styling  
   • Add TypeScript interfaces
   • Include accessibility features

✅ Converting design to production-ready code...
```

## 🔧 Configuration

### **Environment Variables**
```bash
# API Configuration
NASCODER_API_URL=http://localhost:3001/api
PORT=3001
NODE_ENV=production

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

### **Subscription Management**
```bash
# Check current subscription
nascoder auth status

# View available plans
curl http://localhost:3001/api/subscriptions/plans
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- **Community**: GitHub Issues
- **Pro**: Priority email support
- **Enterprise**: Dedicated support channel

## 🗺️ Roadmap

- [ ] Web-based admin dashboard
- [ ] Team collaboration features
- [ ] Custom model fine-tuning
- [ ] IDE extensions (VSCode, IntelliJ)
- [ ] Mobile app for code review
- [ ] Integration with popular dev tools

---

**Built with ❤️ for developers worldwide**
