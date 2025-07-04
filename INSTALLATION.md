# 📦 nascoder Installation Guide

## 🚀 **Quick Install (Recommended)**

### **Option 1: Install from NPM (Coming Soon)**
```bash
# Global installation
npm install -g nascoder

# Verify installation
nascoder --version
nascoder --help
```

### **Option 2: Install from GitHub (Available Now)**
```bash
# Clone the repository
git clone https://github.com/freelancernasimofficial/nascoder.git
cd nascoder

# Install dependencies
cd cli && npm install
cd ../backend && npm install

# Create global link
cd cli && npm link

# Verify installation
nascoder --version
nascoder features
```

---

## 🎯 **Usage After Installation**

### **1. Check Available Commands**
```bash
nascoder --help
```

**Output:**
```
Usage: nascoder [options] [command]

AI-powered conversational development assistant

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  auth <action>   Authentication management
  models          List available AI models
  features        Show available features
  help [command]  display help for command
```

### **2. View Available Features**
```bash
nascoder features
```

### **3. List AI Models**
```bash
nascoder models
```

### **4. Authentication**
```bash
# Register/Login
nascoder auth login

# Check status
nascoder auth status

# Logout
nascoder auth logout
```

### **5. Start Conversational Session**
```bash
# Main feature - conversational interface
nascoder
```

**Then you can ask naturally:**
```
nascoder> create a react app with typescript
nascoder> convert figma design to react component
nascoder> design database schema for ecommerce
nascoder> plan architecture for food delivery app
```

---

## 🔧 **System Requirements**

### **Minimum Requirements**
- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher
- **OS**: macOS, Linux, or Windows
- **Memory**: 512MB RAM
- **Storage**: 100MB free space

### **Recommended Requirements**
- **Node.js**: v20.0.0 or higher
- **npm**: v10.0.0 or higher
- **Memory**: 1GB RAM
- **Storage**: 500MB free space
- **Internet**: For AI features

### **Check Your System**
```bash
# Check Node.js version
node --version

# Check npm version
npm --version
```

---

## 🏗️ **Development Setup**

### **For Contributors**
```bash
# Clone repository
git clone https://github.com/freelancernasimofficial/nascoder.git
cd nascoder

# Install all dependencies
cd cli && npm install
cd ../backend && npm install

# Start development environment
cd .. && ./start.sh
```

### **Backend Server (Optional)**
```bash
# Start backend server for full functionality
cd backend && npm start

# Backend will run on http://localhost:3001
# Health check: http://localhost:3001/health
```

---

## 🐳 **Docker Installation**

### **Run Backend with Docker**
```bash
# Build Docker image
cd backend
docker build -t nascoder-backend .

# Run container
docker run -p 3001:3001 nascoder-backend
```

---

## 🔍 **Troubleshooting**

### **Common Issues**

#### **1. Command not found: nascoder**
```bash
# Solution: Create npm link
cd nascoder/cli
npm link

# Or add to PATH
export PATH=$PATH:/path/to/nascoder/cli/src
```

#### **2. Permission denied**
```bash
# Solution: Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

#### **3. Module not found errors**
```bash
# Solution: Reinstall dependencies
cd nascoder/cli
rm -rf node_modules package-lock.json
npm install
```

#### **4. Backend connection failed**
```bash
# Solution: Start backend server
cd nascoder/backend
npm start

# Check if running
curl http://localhost:3001/health
```

---

## 🔄 **Updates**

### **Update nascoder**
```bash
# If installed via npm (future)
npm update -g nascoder

# If installed via GitHub
cd nascoder
git pull origin main
cd cli && npm install
cd ../backend && npm install
```

### **Check for Updates**
```bash
# Check current version
nascoder --version

# Check latest version on GitHub
curl -s https://api.github.com/repos/freelancernasimofficial/nascoder/releases/latest
```

---

## 🆘 **Getting Help**

### **Documentation**
- 📖 [README](https://github.com/freelancernasimofficial/nascoder/blob/main/README.md)
- 🤝 [Contributing](https://github.com/freelancernasimofficial/nascoder/blob/main/CONTRIBUTING.md)

### **Support**
- 🐛 [Report Issues](https://github.com/freelancernasimofficial/nascoder/issues)
- 💬 [Discussions](https://github.com/freelancernasimofficial/nascoder/discussions)

### **Community**
- ⭐ [Star the Repository](https://github.com/freelancernasimofficial/nascoder)
- 🍴 [Fork and Contribute](https://github.com/freelancernasimofficial/nascoder/fork)
- 📢 Share with developers

---

## 🎉 **Success!**

After installation, you should be able to run:

```bash
nascoder --help        # Show help
nascoder features      # List capabilities
nascoder models        # Show AI models
nascoder auth login    # Register/Login
nascoder               # Start conversational session
```

**Welcome to nascoder - Your AI Development Assistant!** 🚀
