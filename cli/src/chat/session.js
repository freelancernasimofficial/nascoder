import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { NascodeAuth } from '../auth/manager.js';
import { NascodeAI } from '../ai/engine.js';
import { NascodePermissions } from '../permissions/manager.js';

export class NascodeChat {
  constructor() {
    this.auth = new NascodeAuth();
    this.ai = new NascodeAI();
    this.permissions = new NascodePermissions();
    this.sessionActive = false;
  }

  async start() {
    // Check authentication
    const isAuth = await this.auth.isAuthenticated();
    if (!isAuth) {
      console.log(chalk.red('❌ Please login first: nascoder auth login\n'));
      return;
    }

    const user = await this.auth.getUser();
    this.showWelcome(user);
    
    this.sessionActive = true;
    
    while (this.sessionActive) {
      try {
        const { input } = await inquirer.prompt([
          {
            type: 'input',
            name: 'input',
            message: chalk.cyan('nascoder>'),
            validate: (input) => input.trim().length > 0 || 'Please enter a command or question'
          }
        ]);

        const trimmedInput = input.trim().toLowerCase();

        // Handle special commands
        if (trimmedInput === 'exit' || trimmedInput === 'quit') {
          this.sessionActive = false;
          console.log(chalk.green('👋 Goodbye! Happy coding!'));
          break;
        }

        if (trimmedInput === 'help') {
          this.showHelp();
          continue;
        }

        if (trimmedInput === 'clear') {
          console.clear();
          this.showWelcome(user);
          continue;
        }

        // Process conversational input
        await this.processConversationalInput(input);

      } catch (error) {
        if (error.isTtyError) {
          console.log(chalk.red('❌ Interactive mode not supported in this environment'));
          break;
        }
        console.log(chalk.red('❌ Error:', error.message));
      }
    }
  }

  showWelcome(user) {
    console.log(chalk.cyan('\n┌─────────────────────────────────────────────────────────────┐'));
    console.log(chalk.cyan('│  🚀 Welcome to nascoder - AI Development Assistant          │'));
    console.log(chalk.cyan('│  Connected to Azure AI Hub (60+ models available)          │'));
    console.log(chalk.cyan('│  Type \'help\' for commands or just describe what you need   │'));
    console.log(chalk.cyan('└─────────────────────────────────────────────────────────────┘'));
    
    if (user) {
      console.log(chalk.white(`\n👤 Logged in as: ${user.username} (${user.subscription_plan})`));
    }
    console.log(chalk.gray('💡 Examples: "create a react app", "convert figma to react", "plan a database"\n'));
  }

  showHelp() {
    console.log(chalk.cyan('\n📚 nascoder Help:'));
    console.log(chalk.white('\n🎯 What you can ask:'));
    console.log(chalk.gray('   • "create a react app with typescript"'));
    console.log(chalk.gray('   • "convert this figma design to react component"'));
    console.log(chalk.gray('   • "plan architecture for food delivery app"'));
    console.log(chalk.gray('   • "optimize this code for performance"'));
    console.log(chalk.gray('   • "design database schema for ecommerce"'));
    console.log(chalk.gray('   • "generate python api with fastapi"'));
    
    console.log(chalk.white('\n⚡ Special commands:'));
    console.log(chalk.gray('   • help    - Show this help'));
    console.log(chalk.gray('   • clear   - Clear screen'));
    console.log(chalk.gray('   • exit    - Exit nascoder'));
    
    console.log(chalk.white('\n🔒 Permission system:'));
    console.log(chalk.gray('   • nascoder will ask before creating files'));
    console.log(chalk.gray('   • Choose session/once/cancel permissions'));
    console.log(chalk.gray('   • All operations are safe and reversible\n'));
  }

  async processConversationalInput(input) {
    const spinner = ora('🤖 Analyzing your request...').start();
    
    try {
      // 1. Analyze user intent
      const intent = await this.ai.analyzeIntent(input);
      spinner.text = '📋 Planning actions...';
      
      // 2. Create action plan
      const actionPlan = await this.ai.createActionPlan(intent);
      spinner.stop();
      
      // 3. Show action plan to user
      this.displayActionPlan(actionPlan);
      
      // 4. Request permissions if needed
      if (actionPlan.requiresPermissions) {
        const granted = await this.permissions.requestPermission(actionPlan);
        if (!granted) {
          console.log(chalk.yellow('⚠️  Operation cancelled by user\n'));
          return;
        }
      }
      
      // 5. Execute with real-time feedback
      await this.executeWithFeedback(actionPlan);
      
    } catch (error) {
      spinner.stop();
      console.log(chalk.red('❌ Error processing request:', error.message));
      
      if (error.response?.status === 429) {
        console.log(chalk.yellow('⚠️  Rate limit reached. Please upgrade your subscription.'));
      }
    }
  }

  displayActionPlan(plan) {
    console.log(chalk.cyan('\n🤖 I understand you want to:'));
    console.log(chalk.white(`   ${plan.summary}\n`));
    
    if (plan.actions && plan.actions.length > 0) {
      console.log(chalk.cyan('📋 Planned Actions:'));
      plan.actions.forEach((action, i) => {
        console.log(chalk.white(`   ${i + 1}. ${action.description}`));
      });
    }
    
    if (plan.risks && plan.risks.length > 0) {
      console.log(chalk.yellow('\n⚠️  Considerations:'));
      plan.risks.forEach(risk => {
        console.log(chalk.gray(`   • ${risk}`));
      });
    }
  }

  async executeWithFeedback(actionPlan) {
    const spinner = ora('🚀 Executing plan...').start();
    
    try {
      for (const action of actionPlan.actions) {
        spinner.text = `⚡ ${action.description}...`;
        
        const result = await this.ai.executeAction(action);
        
        if (result.success) {
          console.log(chalk.green(`✅ ${action.description}`));
          
          // Show generated code or files
          if (result.code) {
            console.log(chalk.gray('\n📄 Generated code:'));
            console.log(chalk.white(result.code));
          }
          
          if (result.files) {
            console.log(chalk.gray('\n📁 Created files:'));
            result.files.forEach(file => {
              console.log(chalk.white(`   • ${file}`));
            });
          }
        } else {
          console.log(chalk.red(`❌ ${action.description}: ${result.error}`));
        }
      }
      
      spinner.stop();
      console.log(chalk.green('\n🎉 Task completed successfully!\n'));
      
    } catch (error) {
      spinner.stop();
      console.log(chalk.red('❌ Execution failed:', error.message));
    }
  }
}
