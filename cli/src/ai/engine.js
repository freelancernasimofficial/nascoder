import { AzureOpenAI } from 'openai';
import { DefaultAzureCredential } from '@azure/identity';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

export class NascodeAI {
  constructor() {
    this.endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    this.apiKey = process.env.AZURE_OPENAI_KEY;
    this.client = null;
    this.initializeClient();
  }

  async initializeClient() {
    if (this.apiKey) {
      this.client = new AzureOpenAI({
        endpoint: this.endpoint,
        apiKey: this.apiKey,
        apiVersion: "2024-02-01"
      });
    } else {
      // For development, use mock client
      this.client = {
        chat: {
          completions: {
            create: async (params) => ({
              choices: [{ message: { content: "Mock response for development" } }]
            })
          }
        }
      };
    }
  }

  async analyzeIntent(input) {
    const prompt = `
Analyze this user request and determine the intent and complexity:

User Request: "${input}"

Respond with JSON only:
{
  "intent": "code_generation|architecture_planning|figma_conversion|code_optimization|database_design|general_question",
  "complexity": 1-10,
  "requires_files": true/false,
  "requires_packages": true/false,
  "programming_language": "detected language or null",
  "framework": "detected framework or null",
  "summary": "brief summary of what user wants"
}`;

    try {
      const response = await this.client.getChatCompletions(
        'gpt-35-turbo', // Use cheaper model for intent analysis
        [{ role: 'user', content: prompt }],
        { maxTokens: 200, temperature: 0.1 }
      );

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      // Fallback intent analysis
      return this.fallbackIntentAnalysis(input);
    }
  }

  fallbackIntentAnalysis(input) {
    const lower = input.toLowerCase();
    
    if (lower.includes('react') || lower.includes('component')) {
      return {
        intent: 'code_generation',
        complexity: 6,
        requires_files: true,
        requires_packages: true,
        programming_language: 'javascript',
        framework: 'react',
        summary: 'Create React component or application'
      };
    }
    
    if (lower.includes('figma') || lower.includes('design')) {
      return {
        intent: 'figma_conversion',
        complexity: 8,
        requires_files: true,
        requires_packages: true,
        programming_language: 'javascript',
        framework: 'react',
        summary: 'Convert design to code'
      };
    }
    
    if (lower.includes('database') || lower.includes('schema')) {
      return {
        intent: 'database_design',
        complexity: 7,
        requires_files: true,
        requires_packages: false,
        programming_language: 'sql',
        framework: null,
        summary: 'Design database schema'
      };
    }
    
    return {
      intent: 'general_question',
      complexity: 5,
      requires_files: false,
      requires_packages: false,
      programming_language: null,
      framework: null,
      summary: 'General development question'
    };
  }

  async createActionPlan(intent) {
    const actions = [];
    const risks = [];
    let requiresPermissions = false;

    switch (intent.intent) {
      case 'code_generation':
        if (intent.framework === 'react') {
          actions.push({
            type: 'create_directory',
            description: `Create ${intent.framework} project directory`,
            path: `./${intent.framework}-app`
          });
          actions.push({
            type: 'install_packages',
            description: 'Install required npm packages',
            packages: ['react', 'react-dom', '@types/react']
          });
          actions.push({
            type: 'generate_code',
            description: 'Generate React components and files',
            language: intent.programming_language
          });
          requiresPermissions = true;
          risks.push('Will create new directory and files');
          risks.push('Will install npm packages');
        }
        break;

      case 'figma_conversion':
        actions.push({
          type: 'analyze_figma',
          description: 'Analyze Figma design',
        });
        actions.push({
          type: 'generate_react_component',
          description: 'Generate React component from design',
        });
        requiresPermissions = true;
        risks.push('Will create React component files');
        break;

      case 'database_design':
        actions.push({
          type: 'design_schema',
          description: 'Design database schema',
        });
        actions.push({
          type: 'create_sql_files',
          description: 'Create SQL migration files',
        });
        requiresPermissions = true;
        risks.push('Will create SQL files');
        break;

      case 'architecture_planning':
        actions.push({
          type: 'plan_architecture',
          description: 'Create comprehensive architecture plan',
        });
        actions.push({
          type: 'generate_documentation',
          description: 'Generate technical documentation',
        });
        requiresPermissions = true;
        risks.push('Will create documentation files');
        break;

      default:
        actions.push({
          type: 'answer_question',
          description: 'Provide detailed answer',
        });
    }

    return {
      summary: intent.summary,
      actions,
      risks,
      requiresPermissions,
      permissions: requiresPermissions ? ['file_system', 'npm_install'] : []
    };
  }

  async executeAction(action) {
    try {
      switch (action.type) {
        case 'create_directory':
          return await this.createDirectory(action);
        
        case 'install_packages':
          return await this.installPackages(action);
        
        case 'generate_code':
          return await this.generateCode(action);
        
        case 'analyze_figma':
          return await this.analyzeFigma(action);
        
        case 'generate_react_component':
          return await this.generateReactComponent(action);
        
        case 'design_schema':
          return await this.designSchema(action);
        
        case 'create_sql_files':
          return await this.createSqlFiles(action);
        
        case 'plan_architecture':
          return await this.planArchitecture(action);
        
        case 'answer_question':
          return await this.answerQuestion(action);
        
        default:
          return { success: false, error: 'Unknown action type' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async createDirectory(action) {
    try {
      await fs.mkdir(action.path, { recursive: true });
      return { success: true, files: [action.path] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async installPackages(action) {
    // For now, just simulate package installation
    // In production, you'd use child_process to run npm install
    return { 
      success: true, 
      message: `Would install: ${action.packages.join(', ')}` 
    };
  }

  async generateCode(action) {
    const prompt = `Generate a complete React application with TypeScript. Include:
1. App.tsx with modern React patterns
2. Component structure
3. Basic styling
4. TypeScript interfaces
5. Error boundaries

Make it production-ready and well-commented.`;

    try {
      const response = await this.client.getChatCompletions(
        'gpt-4-turbo',
        [{ role: 'user', content: prompt }],
        { maxTokens: 2000, temperature: 0.2 }
      );

      const code = response.choices[0].message.content;
      
      // Save code to file
      const fileName = 'App.tsx';
      await fs.writeFile(fileName, code);
      
      return { 
        success: true, 
        code: code.substring(0, 500) + '...', // Show preview
        files: [fileName]
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async analyzeFigma(action) {
    return { 
      success: true, 
      message: 'Figma analysis completed (demo mode)' 
    };
  }

  async generateReactComponent(action) {
    const componentCode = `
import React from 'react';
import './Component.css';

interface ComponentProps {
  title: string;
  description?: string;
}

const GeneratedComponent: React.FC<ComponentProps> = ({ title, description }) => {
  return (
    <div className="generated-component">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
};

export default GeneratedComponent;
`;

    await fs.writeFile('GeneratedComponent.tsx', componentCode);
    
    return { 
      success: true, 
      code: componentCode,
      files: ['GeneratedComponent.tsx']
    };
  }

  async designSchema(action) {
    return { 
      success: true, 
      message: 'Database schema designed (demo mode)' 
    };
  }

  async createSqlFiles(action) {
    const sqlCode = `
-- Generated database schema
CREATE TABLE users (
    id INT PRIMARY KEY IDENTITY(1,1),
    username NVARCHAR(50) UNIQUE NOT NULL,
    email NVARCHAR(100) UNIQUE NOT NULL,
    created_at DATETIME2 DEFAULT GETDATE()
);

CREATE TABLE projects (
    id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT FOREIGN KEY REFERENCES users(id),
    name NVARCHAR(100) NOT NULL,
    description NVARCHAR(MAX),
    created_at DATETIME2 DEFAULT GETDATE()
);
`;

    await fs.writeFile('schema.sql', sqlCode);
    
    return { 
      success: true, 
      code: sqlCode,
      files: ['schema.sql']
    };
  }

  async planArchitecture(action) {
    return { 
      success: true, 
      message: 'Architecture plan created (demo mode)' 
    };
  }

  async answerQuestion(action) {
    return { 
      success: true, 
      message: 'Question answered (demo mode)' 
    };
  }
}
