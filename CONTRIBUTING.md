# Contributing to nascoder

Thank you for your interest in contributing to nascoder! 🚀

## Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/nascoder.git
   cd nascoder
   ```

3. **Install dependencies**
   ```bash
   # CLI dependencies
   cd cli && npm install
   
   # Backend dependencies
   cd ../backend && npm install
   ```

4. **Start development environment**
   ```bash
   ./start.sh
   ```

## Development Workflow

### 1. Create a feature branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make your changes
- Follow the existing code style
- Add tests for new features
- Update documentation as needed

### 3. Test your changes
```bash
# Test CLI
cd cli && npm test

# Test backend
cd backend && npm test

# Manual testing
node test-conversation.js
node test-codegen.js
```

### 4. Commit your changes
```bash
git add .
git commit -m "✨ Add your feature description"
```

### 5. Push and create PR
```bash
git push origin feature/your-feature-name
```

## Code Style Guidelines

### JavaScript/Node.js
- Use ES6+ features
- Use async/await over promises
- Use meaningful variable names
- Add JSDoc comments for functions
- Follow existing error handling patterns

### CLI Interface
- Keep conversational tone friendly
- Use emojis consistently (🚀 🎯 ✅ ❌ ⚡ 🔒)
- Provide clear error messages
- Always ask for permissions before file operations

### API Design
- Use RESTful conventions
- Return consistent JSON responses
- Include proper HTTP status codes
- Add input validation
- Use middleware for common functionality

## Project Structure

```
nascoder/
├── cli/                    # CLI application
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
└── docs/                  # Documentation
```

## Adding New Features

### New CLI Commands
1. Add command to `cli/src/index.js`
2. Create handler in appropriate module
3. Add tests
4. Update documentation

### New AI Capabilities
1. Add intent type to `ai/engine.js`
2. Implement action planning
3. Add execution logic
4. Test with various inputs

### New API Endpoints
1. Create route in `backend/src/routes/`
2. Add middleware if needed
3. Update authentication/authorization
4. Add input validation
5. Write tests

## Testing

### Unit Tests
```bash
npm test
```

### Integration Tests
```bash
# Test full workflow
./start.sh
node test-conversation.js
node test-codegen.js
```

### Manual Testing
```bash
# Test CLI
nascoder auth login
nascoder features
nascoder models
nascoder  # Start conversation

# Test API
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "freelancernasim", "password": "1234"}'
```

## Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for new functions
- Update API documentation
- Add examples for new features

## Subscription Features

When adding features that should be subscription-gated:

```javascript
// Check subscription level
if (user.subscription_plan === 'Free' && isAdvancedFeature) {
  return res.status(403).json({
    error: 'Upgrade required',
    message: 'This feature requires Pro or Enterprise subscription'
  });
}
```

## Azure Integration

When adding new Azure AI features:

1. Update model configurations in `azure/models.json`
2. Add cost optimization logic
3. Implement fallback for development mode
4. Update deployment scripts if needed

## Security Guidelines

- Never commit API keys or secrets
- Use environment variables for configuration
- Validate all user inputs
- Use parameterized queries for database operations
- Implement proper authentication/authorization
- Follow OWASP security guidelines

## Pull Request Process

1. **Description**: Clearly describe what your PR does
2. **Testing**: Include test results
3. **Documentation**: Update relevant docs
4. **Breaking Changes**: Clearly mark any breaking changes
5. **Screenshots**: Include screenshots for UI changes

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
```

## Getting Help

- **Issues**: Create a GitHub issue
- **Discussions**: Use GitHub Discussions
- **Email**: Contact maintainers directly

## Code of Conduct

- Be respectful and inclusive
- Help others learn and grow
- Focus on constructive feedback
- Celebrate contributions of all sizes

## Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Invited to maintainer discussions (for significant contributions)

Thank you for contributing to nascoder! 🎉
