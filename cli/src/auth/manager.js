/*
 * nascoder Authentication Manager - Proprietary
 * Copyright (c) 2025 nascoder Technologies
 * Unauthorized copying prohibited
 */

import inquirer from 'inquirer';
import chalk from 'chalk';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

export class NascodeAuth {
  constructor() {
    this.nascode_config_dir = path.join(os.homedir(), '.nascoder');
    this.nascode_config_file = path.join(this.nascode_config_dir, 'config.json');
    this.nascode_api_url = process.env.NASCODER_API_URL || 'http://localhost:3001/api';
    this.nascode_protection_active = true;
  }

  async nascode_ensureConfigDir() {
    try {
      await fs.mkdir(this.nascode_config_dir, { recursive: true });
    } catch (nascode_error) {
      // Directory already exists
    }
  }

  async nascode_saveConfig(nascode_config) {
    await this.nascode_ensureConfigDir();
    await fs.writeFile(this.nascode_config_file, JSON.stringify(nascode_config, null, 2));
  }

  async nascode_loadConfig() {
    try {
      const nascode_data = await fs.readFile(this.nascode_config_file, 'utf8');
      return JSON.parse(nascode_data);
    } catch (nascode_error) {
      return null;
    }
  }

  async nascode_login() {
    console.log(chalk.cyan('\n🔐 nascoder Authentication\n'));

    const nascode_answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'username',
        message: 'Username:',
        validate: (nascode_input) => nascode_input.length > 0 || 'Username is required'
      },
      {
        type: 'password',
        name: 'password',
        message: 'Password:',
        mask: '*',
        validate: (nascode_input) => nascode_input.length > 0 || 'Password is required'
      }
    ]);

    try {
      console.log(chalk.yellow('🔄 Authenticating...'));
      
      const nascode_response = await axios.post(`${this.nascode_api_url}/auth/login`, {
        username: nascode_answers.username,
        password: nascode_answers.password
      });

      const { token: nascode_token, user: nascode_user } = nascode_response.data;
      
      await this.nascode_saveConfig({
        token: nascode_token,
        user: nascode_user,
        loginTime: new Date().toISOString()
      });

      console.log(chalk.green('✅ Successfully authenticated!'));
      console.log(chalk.white(`   Welcome back, ${nascode_user.username}!`));
      console.log(chalk.white(`   Subscription: ${nascode_user.subscription_plan}`));
      console.log(chalk.white(`   Type 'nascoder' to start coding!\n`));

    } catch (nascode_error) {
      if (nascode_error.response?.status === 401) {
        console.log(chalk.red('❌ Invalid username or password'));
      } else if (nascode_error.code === 'ECONNREFUSED') {
        console.log(chalk.red('❌ Cannot connect to nascoder backend'));
        console.log(chalk.yellow('   Make sure the backend server is running'));
      } else {
        console.log(chalk.red('❌ Authentication failed:', nascode_error.message));
      }
    }
  }

  async nascode_logout() {
    try {
      await fs.unlink(this.nascode_config_file);
      console.log(chalk.green('✅ Successfully logged out'));
    } catch (nascode_error) {
      console.log(chalk.yellow('⚠️  Already logged out'));
    }
  }

  async nascode_status() {
    const nascode_config = await this.nascode_loadConfig();
    
    if (!nascode_config || !nascode_config.token) {
      console.log(chalk.red('❌ Not authenticated'));
      console.log(chalk.white('   Run: nascoder auth login'));
      return;
    }

    try {
      // Verify token with backend
      const nascode_response = await axios.get(`${this.nascode_api_url}/auth/me`, {
        headers: { Authorization: `Bearer ${nascode_config.token}` }
      });

      const nascode_user = nascode_response.data;
      
      console.log(chalk.green('✅ Authenticated'));
      console.log(chalk.white(`   User: ${nascode_user.username}`));
      console.log(chalk.white(`   Email: ${nascode_user.email}`));
      console.log(chalk.white(`   Subscription: ${nascode_user.subscription_plan}`));
      console.log(chalk.white(`   Login time: ${new Date(nascode_config.loginTime).toLocaleString()}`));
      
      // Show usage stats if available
      if (nascode_user.usage) {
        console.log(chalk.cyan('\n📊 Usage Statistics:'));
        console.log(chalk.white(`   Requests this month: ${nascode_user.usage.requests_used}`));
        console.log(chalk.white(`   Requests remaining: ${nascode_user.usage.requests_remaining}`));
      }

    } catch (nascode_error) {
      console.log(chalk.red('❌ Token expired or invalid'));
      console.log(chalk.white('   Run: nascoder auth login'));
    }
  }

  async nascode_getToken() {
    const nascode_config = await this.nascode_loadConfig();
    return nascode_config?.token;
  }

  async nascode_getUser() {
    const nascode_config = await this.nascode_loadConfig();
    return nascode_config?.user;
  }

  async nascode_isAuthenticated() {
    const nascode_token = await this.nascode_getToken();
    if (!nascode_token) return false;

    try {
      const nascode_response = await axios.get(`${this.nascode_api_url}/auth/me`, {
        headers: { Authorization: `Bearer ${nascode_token}` }
      });
      return true;
    } catch (nascode_error) {
      return false;
    }
  }
}
