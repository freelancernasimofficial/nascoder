#!/bin/bash

echo "🚀 Deploying nascoder to Azure..."

# Build the Next.js app
echo "📦 Building Next.js application..."
cd web
npm run build

# Create Azure Static Web App (you'll need to run this once)
echo "🌐 Creating Azure Static Web App..."
echo "Run this command in Azure CLI:"
echo "az staticwebapp create \\"
echo "  --name nascoder-dashboard \\"
echo "  --resource-group nascoder-rg \\"
echo "  --source https://github.com/freelancernasimofficial/nascoder \\"
echo "  --location 'East US 2' \\"
echo "  --branch main \\"
echo "  --app-location '/web' \\"
echo "  --output-location 'out'"

echo ""
echo "🔧 After creating the Static Web App:"
echo "1. Get the deployment token from Azure portal"
echo "2. Add it as AZURE_STATIC_WEB_APPS_API_TOKEN in GitHub secrets"
echo "3. Push to main branch to trigger deployment"

echo ""
echo "🌍 Your nascoder dashboard will be available at:"
echo "https://nascoder-dashboard.azurestaticapps.net"

echo ""
echo "✅ Deployment setup complete!"
