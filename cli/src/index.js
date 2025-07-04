#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { NascodeAuth } from './auth/manager.js';
import { NascodeChat } from './chat/session.js';
import { NascodeModels } from './ai/models.js';
import dotenv from 'dotenv';

dotenv.config();

const program = new Command();
const auth = new NascodeAuth();
const models = new NascodeModels();

// ASCII Art Banner
const showBanner = () => {
  console.log(chalk.cyan(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║    ███╗   ██╗ █████╗ ███████╗ ██████╗ ██████╗ ██████╗ ███████╗██████╗  ║
║    ████╗  ██║██╔══██╗██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔════╝██╔══██╗ ║
║    ██╔██╗ ██║███████║███████╗██║     ██║   ██║██║  ██║█████╗  ██████╔╝ ║
║    ██║╚██╗██║██╔══██║╚════██║██║     ██║   ██║██║  ██║██╔══╝  ██╔══██╗ ║
║    ██║ ╚████║██║  ██║███████║╚██████╗╚██████╔╝██████╔╝███████╗██║  ██║ ║
║    ╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝ ║
║                                                           ║
║           AI-Powered Conversational Development Assistant ║
║                     Powered by Azure AI                  ║
╚═══════════════════════════════════════════════════════════╝
  `));
};

// Pre-chat commands only
program
  .name('nascoder')
  .description('AI-powered conversational development assistant')
  .version('1.0.0');

// Authentication commands
program
  .command('auth')
  .description('Authentication management')
  .argument('<action>', 'login, logout, or status')
  .action(async (action) => {
    switch (action) {
      case 'login':
        await auth.login();
        break;
      case 'logout':
        await auth.logout();
        break;
      case 'status':
        await auth.status();
        break;
      default:
        console.log(chalk.red('Unknown auth action. Use: login, logout, or status'));
    }
  });

// Models command
program
  .command('models')
  .description('List available AI models')
  .action(async () => {
    await models.listModels();
  });

// Features command
program
  .command('features')
  .description('Show available features')
  .action(() => {
    console.log(chalk.cyan('\n🚀 nascoder Capabilities:'));
    console.log(chalk.white('   • 🎨 Figma to React conversion'));
    console.log(chalk.white('   • 🏗️  Full-stack app generation'));
    console.log(chalk.white('   • 📊 Database schema design'));
    console.log(chalk.white('   • 🔧 Code analysis & optimization'));
    console.log(chalk.white('   • 📱 Mobile app development'));
    console.log(chalk.white('   • ☁️  Azure deployment ready'));
    console.log(chalk.white('   • 🤖 60+ AI models available'));
    console.log(chalk.white('   • 💬 Conversational interface'));
    console.log(chalk.white('   • 🔒 Enterprise-grade security\n'));
  });

// Main entry point - start chat session
const args = process.argv.slice(2);

if (args.length === 0) {
  // No arguments = start chat session
  showBanner();
  const chat = new NascodeChat();
  await chat.start();
} else {
  // Parse pre-chat commands
  program.parse();
}
