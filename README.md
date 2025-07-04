# 🚀 nascoder - AI-Powered Conversational Development Assistant

nascoder is an enterprise-grade CLI tool that provides conversational AI assistance for software development, powered by Azure AI services.

## ✨ Features

- 🎨 **Figma to React Conversion** - Convert designs to production-ready code
- 🏗️ **Full-Stack App Generation** - Create complete applications with database schemas
- 📊 **Database Design** - Generate optimized database schemas and migrations
- 🔧 **Code Analysis & Optimization** - Improve existing code performance and quality
- 📱 **Mobile App Development** - React Native and native app generation
- ☁️ **Azure Integration** - Seamless deployment to Azure services
- 🤖 **60+ AI Models** - Access to multiple Azure AI models via intelligent routing
- 💬 **Conversational Interface** - Natural language interaction, no complex commands
- 🔒 **Enterprise Security** - JWT authentication, role-based access, audit logging

## 🎯 Subscription Plans

| Plan | Price | Monthly Requests | Features |
|------|-------|------------------|----------|
| **Free** | $0 | 50 | Basic code generation, Community support |
| **Pro** | $20 | 1,000 | Advanced features, Figma-to-React, Priority support |
| **Enterprise** | $40/user | Unlimited | All features, Custom models, Team collaboration |

## 🚀 Quick Start

### 1. Start the Development Environment
```bash
cd ~/Desktop/nascoder
./start.sh
```

### 2. Login with Demo Account
```bash
# In a new terminal
cd ~/Desktop/nascoder/cli
node src/index.js auth login

# Use demo credentials:
# Username: freelancernasim
# Password: 1234
```

### 3. Start Conversational Session
```bash
node src/index.js

# Now you can ask naturally:
nascoder> create a react app with typescript
nascoder> convert this figma design to react component
nascoder> plan architecture for food delivery app
```

## 📋 Available Commands

### Pre-Chat Commands (Limited)
```bash
nascoder auth login          # Login to your account
nascoder auth status         # Check authentication status
nascoder auth logout         # Logout
nascoder models list         # Show available AI models
nascoder features           # Display all capabilities
nascoder version            # Show version info
```

### Conversational Interface
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
│   │   └── ai/           # Azure AI integration
├── backend/               # API server
│   ├── src/
│   │   ├── server.js     # Express server
│   │   ├── routes/       # API routes
│   │   ├── models/       # Database models
│   │   └── middleware/   # Auth middleware
├── azure/                 # Azure infrastructure
│   ├── deploy.sh         # Deployment script
│   └── models.json       # AI model configurations
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

nascoder uses intelligent model routing to minimize costs:

- **GPT-3.5 Turbo** (60% of requests) - $0.50/1M tokens
- **GPT-4 Turbo** (30% of requests) - $10/1M tokens  
- **GPT-4 Vision** (10% of requests) - $20/1M tokens

**Estimated Monthly Costs:**
- Light usage (100 requests): $25-30
- Medium usage (500 requests): $80-100
- Heavy usage (2000+ requests): $200-300

## 🚀 Azure Deployment

### 1. Deploy Infrastructure
```bash
cd azure
./deploy.sh
```

### 2. Update Environment Variables
```bash
# Update .env with Azure resource details
AZURE_OPENAI_ENDPOINT=https://nascoder-openai.openai.azure.com/
AZURE_OPENAI_KEY=your-actual-key
DB_SERVER=nascoder-sql-server.database.windows.net
```

### 3. Deploy Backend to Azure Container Apps
```bash
# Build and deploy backend
az containerapp create \
  --name nascoder-backend \
  --resource-group nascoder-rg \
  --environment nascoder-env \
  --image nascoder-backend:latest
```

## 🧪 Development

### Start Development Environment
```bash
# Terminal 1: Start backend
cd backend && npm run dev

# Terminal 2: Test CLI
cd cli && node src/index.js
```

### Run Tests
```bash
# Backend tests
cd backend && npm test

# CLI tests  
cd cli && npm test
```

## 📊 Usage Examples

### Create React Application
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

### Convert Figma Design
```
nascoder> convert this figma design to react component: https://figma.com/file/abc123

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

### Environment Variables
```bash
# Azure AI Configuration
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
AZURE_OPENAI_KEY=your-openai-key

# Database Configuration  
DB_SERVER=your-sql-server.database.windows.net
DB_NAME=nascoder-db
DB_USER=your-username
DB_PASSWORD=your-password

# Application Configuration
JWT_SECRET=your-jwt-secret
PORT=3001
NODE_ENV=production
```

### Subscription Management
```bash
# Check current subscription
nascoder auth status

# View available plans
curl http://localhost:3001/api/subscriptions/plans

# Usage statistics
curl -H "Authorization: Bearer $TOKEN" \
     http://localhost:3001/api/auth/me
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

**Built with ❤️ by freelancernasim**
**Powered by Azure AI Services**
