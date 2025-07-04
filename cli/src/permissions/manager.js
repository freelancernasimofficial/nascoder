import inquirer from 'inquirer';
import chalk from 'chalk';

export class NascodePermissions {
  constructor() {
    this.sessionPermissions = new Set();
    this.alwaysAsk = true;
  }

  async requestPermission(actionPlan) {
    // If we already have session permissions for these actions, grant automatically
    const hasSessionPermissions = actionPlan.permissions.every(
      permission => this.sessionPermissions.has(permission)
    );

    if (hasSessionPermissions && !this.alwaysAsk) {
      return true;
    }

    console.log(chalk.yellow('\n⚠️  Permission Required:'));
    
    if (actionPlan.permissions.includes('file_system')) {
      console.log(chalk.gray('   □ Create and modify files'));
    }
    if (actionPlan.permissions.includes('npm_install')) {
      console.log(chalk.gray('   □ Install npm packages'));
    }
    if (actionPlan.permissions.includes('network')) {
      console.log(chalk.gray('   □ Make network requests'));
    }

    const { choice } = await inquirer.prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'Choose permission scope:',
        choices: [
          {
            name: '✅ Grant for this session (recommended)',
            value: 'session'
          },
          {
            name: '⚡ Grant for this action only',
            value: 'once'
          },
          {
            name: '🔒 Always ask (secure mode)',
            value: 'always'
          },
          {
            name: '❌ Cancel operation',
            value: 'cancel'
          }
        ]
      }
    ]);

    switch (choice) {
      case 'session':
        // Grant session permissions
        actionPlan.permissions.forEach(permission => {
          this.sessionPermissions.add(permission);
        });
        this.alwaysAsk = false;
        console.log(chalk.green('✅ Session permissions granted'));
        return true;

      case 'once':
        console.log(chalk.green('✅ One-time permission granted'));
        return true;

      case 'always':
        this.alwaysAsk = true;
        console.log(chalk.blue('🔒 Secure mode enabled - will always ask'));
        return true;

      case 'cancel':
        console.log(chalk.red('❌ Operation cancelled'));
        return false;

      default:
        return false;
    }
  }

  hasPermission(permission) {
    return this.sessionPermissions.has(permission);
  }

  clearSessionPermissions() {
    this.sessionPermissions.clear();
    this.alwaysAsk = true;
  }

  showPermissionStatus() {
    console.log(chalk.cyan('\n🔒 Permission Status:'));
    
    if (this.sessionPermissions.size === 0) {
      console.log(chalk.gray('   No active session permissions'));
    } else {
      console.log(chalk.white('   Active session permissions:'));
      this.sessionPermissions.forEach(permission => {
        console.log(chalk.green(`   ✅ ${permission}`));
      });
    }
    
    console.log(chalk.white(`   Always ask: ${this.alwaysAsk ? 'Yes' : 'No'}`));
  }
}
