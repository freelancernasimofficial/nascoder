#!/usr/bin/env node

/*
 * nascoder - Proprietary Software
 * Copyright (c) 2025 nascoder Technologies
 * All Rights Reserved - Unauthorized copying prohibited
 */

import { Command } from 'commander';
import chalk from 'chalk';
import { NascodeAuth } from './auth/manager.js';
import { NascodeChat } from './chat/session.js';
import { NascodeModels } from './ai/models.js';
import dotenv from 'dotenv';

dotenv.config();

const nascode_program = new Command();
const nascode_auth = new NascodeAuth();
const nascode_models = new NascodeModels();

// nascoder ASCII Art Banner
const nascode_showBanner = () => {
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
║                     Enterprise Edition                    ║
╚═══════════════════════════════════════════════════════════╝
  `));
};

// Pre-chat commands only
nascode_program
  .name('nascoder')
  .description('AI-powered conversational development assistant')
  .version('1.0.0');

// Authentication commands
nascode_program
  .command('auth')
  .description('Authentication management')
  .argument('<action>', 'register, login, logout, or status')
  .action(async (nascode_action) => {
    switch (nascode_action) {
      case 'register':
        await nascode_auth.nascode_register();
        break;
      case 'login':
        await nascode_auth.nascode_login();
        break;
      case 'logout':
        await nascode_auth.nascode_logout();
        break;
      case 'status':
        await nascode_auth.nascode_status();
        break;
      default:
        console.log(chalk.red('Unknown auth action. Use: register, login, logout, or status'));
    }
  });

// Models command
nascode_program
  .command('models')
  .description('List available AI models')
  .action(async () => {
    await nascode_models.nascode_listModels();
  });

// Features command
nascode_program
  .command('features')
  .description('Show available features')
  .action(() => {
    console.log(chalk.cyan('\n🚀 nascoder Capabilities:'));
    console.log(chalk.white('   • 🎨 Figma to React conversion'));
    console.log(chalk.white('   • 🏗️  Full-stack app generation'));
    console.log(chalk.white('   • 📊 Database schema design'));
    console.log(chalk.white('   • 🔧 Code analysis & optimization'));
    console.log(chalk.white('   • 📱 Mobile app development'));
    console.log(chalk.white('   • ☁️  Cloud deployment ready'));
    console.log(chalk.white('   • 🤖 Multiple AI models available'));
    console.log(chalk.white('   • 💬 Conversational interface'));
    console.log(chalk.white('   • 🔒 Enterprise-grade security\n'));
  });

// Main entry point - start chat session
const nascode_args = process.argv.slice(2);

if (nascode_args.length === 0) {
  // No arguments = start chat session
  nascode_showBanner();
  const nascode_chat = new NascodeChat();
  await nascode_chat.nascode_start();
} else {
  // Parse pre-chat commands
  nascode_program.parse();
}
