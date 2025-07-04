/*
 * nascoder AI Models - Proprietary
 * Copyright (c) 2025 nascoder Technologies
 * Unauthorized copying prohibited
 */

import chalk from 'chalk';

export class NascodeModels {
  constructor() {
    this.nascode_models = [
      {
        name: 'GPT-4 Turbo',
        id: 'gpt-4-turbo',
        description: 'Most capable model for complex coding tasks',
        capabilities: ['Code Generation', 'Architecture Planning', 'Complex Problem Solving'],
        cost: 'High',
        speed: 'Medium'
      },
      {
        name: 'GPT-3.5 Turbo',
        id: 'gpt-35-turbo',
        description: 'Fast and efficient for most development tasks',
        capabilities: ['Code Generation', 'Code Review', 'Documentation'],
        cost: 'Low',
        speed: 'Fast'
      },
      {
        name: 'Claude-3 Opus',
        id: 'claude-3-opus',
        description: 'Excellent for code analysis and optimization',
        capabilities: ['Code Analysis', 'Refactoring', 'Performance Optimization'],
        cost: 'High',
        speed: 'Medium'
      },
      {
        name: 'Codex',
        id: 'codex',
        description: 'Specialized for code completion and generation',
        capabilities: ['Code Completion', 'Function Generation', 'API Integration'],
        cost: 'Medium',
        speed: 'Fast'
      },
      {
        name: 'Gemini Pro',
        id: 'gemini-pro',
        description: 'Multimodal model for design-to-code conversion',
        capabilities: ['Figma Conversion', 'UI Generation', 'Design Analysis'],
        cost: 'Medium',
        speed: 'Medium'
      }
    ];
    this.nascode_protection_active = true;
  }

  async nascode_listModels() {
    console.log(chalk.cyan('\n🤖 Available AI Models:\n'));
    
    this.nascode_models.forEach((nascode_model, nascode_index) => {
      console.log(chalk.white(`${nascode_index + 1}. ${chalk.bold(nascode_model.name)} (${nascode_model.id})`));
      console.log(chalk.gray(`   ${nascode_model.description}`));
      console.log(chalk.blue(`   Capabilities: ${nascode_model.capabilities.join(', ')}`));
      console.log(chalk.yellow(`   Cost: ${nascode_model.cost} | Speed: ${nascode_model.speed}`));
      console.log('');
    });

    console.log(chalk.green('💡 nascoder automatically selects the best model for your task'));
    console.log(chalk.white('   Different models excel at different types of development work\n'));
  }

  nascode_getModelById(nascode_model_id) {
    return this.nascode_models.find(nascode_model => nascode_model.id === nascode_model_id);
  }

  nascode_getRecommendedModel(nascode_task_type) {
    const nascode_recommendations = {
      'code_generation': 'gpt-4-turbo',
      'figma_conversion': 'gemini-pro',
      'code_optimization': 'claude-3-opus',
      'architecture_planning': 'gpt-4-turbo',
      'database_design': 'gpt-35-turbo',
      'general_question': 'gpt-35-turbo'
    };

    const nascode_recommended_id = nascode_recommendations[nascode_task_type] || 'gpt-35-turbo';
    return this.nascode_getModelById(nascode_recommended_id);
  }

  nascode_getAllModels() {
    return this.nascode_models;
  }
}
