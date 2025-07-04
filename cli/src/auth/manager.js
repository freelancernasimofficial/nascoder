import inquirer from 'inquirer';
import chalk from 'chalk';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

export class NascodeAuth {
  constructor() {
    this.configDir = path.join(os.homedir(), '.nascoder');
    this.configFile = path.join(this.configDir, 'config.json');
    this.apiUrl = process.env.NASCODER_API_URL || 'http://localhost:3001/api';
  }

  async ensureConfigDir() {
    try {
      await fs.mkdir(this.configDir, { recursive: true });
    } catch (error) {
      // Directory already exists
    }
  }

  async saveConfig(config) {
    await this.ensureConfigDir();
    await fs.writeFile(this.configFile, JSON.stringify(config, null, 2));
  }

  async loadConfig() {
    try {
      const data = await fs.readFile(this.configFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  }

  async login() {
    console.log(chalk.cyan('\n🔐 nascoder Authentication\n'));

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'username',
        message: 'Username:',
        validate: (input) => input.length > 0 || 'Username is required'
      },
      {
        type: 'password',
        name: 'password',
        message: 'Password:',
        mask: '*',
        validate: (input) => input.length > 0 || 'Password is required'
      }
    ]);

    try {
      console.log(chalk.yellow('🔄 Authenticating...'));
      
      const response = await axios.post(`${this.apiUrl}/auth/login`, {
        username: answers.username,
        password: answers.password
      });

      const { token, user } = response.data;
      
      await this.saveConfig({
        token,
        user,
        loginTime: new Date().toISOString()
      });

      console.log(chalk.green('✅ Successfully authenticated!'));
      console.log(chalk.white(`   Welcome back, ${user.username}!`));
      console.log(chalk.white(`   Subscription: ${user.subscription_plan}`));
      console.log(chalk.white(`   Type 'nascoder' to start coding!\n`));

    } catch (error) {
      if (error.response?.status === 401) {
        console.log(chalk.red('❌ Invalid username or password'));
      } else if (error.code === 'ECONNREFUSED') {
        console.log(chalk.red('❌ Cannot connect to nascoder backend'));
        console.log(chalk.yellow('   Make sure the backend server is running'));
      } else {
        console.log(chalk.red('❌ Authentication failed:', error.message));
      }
    }
  }

  async logout() {
    try {
      await fs.unlink(this.configFile);
      console.log(chalk.green('✅ Successfully logged out'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  Already logged out'));
    }
  }

  async status() {
    const config = await this.loadConfig();
    
    if (!config || !config.token) {
      console.log(chalk.red('❌ Not authenticated'));
      console.log(chalk.white('   Run: nascoder auth login'));
      return;
    }

    try {
      // Verify token with backend
      const response = await axios.get(`${this.apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${config.token}` }
      });

      const user = response.data;
      
      console.log(chalk.green('✅ Authenticated'));
      console.log(chalk.white(`   User: ${user.username}`));
      console.log(chalk.white(`   Email: ${user.email}`));
      console.log(chalk.white(`   Subscription: ${user.subscription_plan}`));
      console.log(chalk.white(`   Login time: ${new Date(config.loginTime).toLocaleString()}`));
      
      // Show usage stats if available
      if (user.usage) {
        console.log(chalk.cyan('\n📊 Usage Statistics:'));
        console.log(chalk.white(`   Requests this month: ${user.usage.requests_used}`));
        console.log(chalk.white(`   Requests remaining: ${user.usage.requests_remaining}`));
      }

    } catch (error) {
      console.log(chalk.red('❌ Token expired or invalid'));
      console.log(chalk.white('   Run: nascoder auth login'));
    }
  }

  async getToken() {
    const config = await this.loadConfig();
    return config?.token;
  }

  async getUser() {
    const config = await this.loadConfig();
    return config?.user;
  }

  async isAuthenticated() {
    const token = await this.getToken();
    if (!token) return false;

    try {
      const response = await axios.get(`${this.apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
