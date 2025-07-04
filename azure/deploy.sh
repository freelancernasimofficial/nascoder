#!/bin/bash

# nascoder Azure Infrastructure Deployment Script
# This script sets up all Azure resources needed for nascoder

set -e

echo "🚀 Starting nascoder Azure Infrastructure Deployment"

# Configuration
RESOURCE_GROUP="nascoder-rg"
LOCATION="eastus"
OPENAI_NAME="nascoder-openai"
SQL_SERVER="nascoder-sql-server"
SQL_DATABASE="nascoder-db"
CONTAINER_APP_ENV="nascoder-env"
CONTAINER_APP="nascoder-backend"
KEY_VAULT="nascoder-kv"

# Create resource group
echo "📦 Creating resource group: $RESOURCE_GROUP"
az group create --name $RESOURCE_GROUP --location $LOCATION

# Create Azure OpenAI Service
echo "🤖 Creating Azure OpenAI Service"
az cognitiveservices account create \
  --name $OPENAI_NAME \
  --resource-group $RESOURCE_GROUP \
  --kind OpenAI \
  --sku S0 \
  --location $LOCATION \
  --yes

# Deploy AI models
echo "🧠 Deploying AI models"
az cognitiveservices account deployment create \
  --resource-group $RESOURCE_GROUP \
  --name $OPENAI_NAME \
  --deployment-name "gpt-4-turbo" \
  --model-name "gpt-4" \
  --model-version "turbo-2024-04-09" \
  --model-format OpenAI \
  --sku-capacity 10 \
  --sku-name "Standard"

az cognitiveservices account deployment create \
  --resource-group $RESOURCE_GROUP \
  --name $OPENAI_NAME \
  --deployment-name "gpt-35-turbo" \
  --model-name "gpt-35-turbo" \
  --model-version "0125" \
  --model-format OpenAI \
  --sku-capacity 20 \
  --sku-name "Standard"

az cognitiveservices account deployment create \
  --resource-group $RESOURCE_GROUP \
  --name $OPENAI_NAME \
  --deployment-name "gpt-4-vision" \
  --model-name "gpt-4" \
  --model-version "vision-preview" \
  --model-format OpenAI \
  --sku-capacity 5 \
  --sku-name "Standard"

# Create SQL Server and Database
echo "🗄️ Creating SQL Server and Database"
az sql server create \
  --name $SQL_SERVER \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --admin-user nascoderadmin \
  --admin-password "NascoderAdmin123!"

az sql db create \
  --resource-group $RESOURCE_GROUP \
  --server $SQL_SERVER \
  --name $SQL_DATABASE \
  --service-objective Basic

# Create Key Vault
echo "🔐 Creating Key Vault"
az keyvault create \
  --name $KEY_VAULT \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION

# Store secrets in Key Vault
echo "🔑 Storing secrets in Key Vault"
OPENAI_KEY=$(az cognitiveservices account keys list --name $OPENAI_NAME --resource-group $RESOURCE_GROUP --query key1 -o tsv)
OPENAI_ENDPOINT=$(az cognitiveservices account show --name $OPENAI_NAME --resource-group $RESOURCE_GROUP --query properties.endpoint -o tsv)

az keyvault secret set --vault-name $KEY_VAULT --name "openai-key" --value "$OPENAI_KEY"
az keyvault secret set --vault-name $KEY_VAULT --name "openai-endpoint" --value "$OPENAI_ENDPOINT"
az keyvault secret set --vault-name $KEY_VAULT --name "jwt-secret" --value "nascoder-jwt-secret-$(date +%s)"

# Create Container Apps Environment
echo "🐳 Creating Container Apps Environment"
az containerapp env create \
  --name $CONTAINER_APP_ENV \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION

# Output important information
echo ""
echo "✅ nascoder Azure Infrastructure Deployed Successfully!"
echo ""
echo "📋 Resource Information:"
echo "Resource Group: $RESOURCE_GROUP"
echo "OpenAI Service: $OPENAI_NAME"
echo "OpenAI Endpoint: $OPENAI_ENDPOINT"
echo "SQL Server: $SQL_SERVER"
echo "SQL Database: $SQL_DATABASE"
echo "Key Vault: $KEY_VAULT"
echo ""
echo "🔑 Next Steps:"
echo "1. Update .env files with the connection strings"
echo "2. Deploy the backend container app"
echo "3. Test the CLI with 'nascoder auth login'"
echo ""
echo "💰 Estimated Monthly Cost: $50-100 (depending on usage)"
