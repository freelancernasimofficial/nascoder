import sql from 'mssql';
import bcrypt from 'bcryptjs';

export class Database {
  constructor() {
    this.config = {
      server: process.env.DB_SERVER || 'localhost',
      database: process.env.DB_NAME || 'nascoder',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      options: {
        encrypt: true,
        trustServerCertificate: true
      }
    };
    this.pool = null;
  }

  async initialize() {
    try {
      // For development, use in-memory storage
      if (process.env.NODE_ENV === 'development' || !process.env.DB_SERVER) {
        console.log('🔧 Using in-memory database for development');
        this.initializeInMemoryDB();
        return;
      }

      this.pool = await sql.connect(this.config);
      console.log('✅ Connected to Azure SQL Database');
      
      // Create tables if they don't exist
      await this.createTables();
      await this.seedDemoData();
      
    } catch (error) {
      console.error('❌ Database connection failed:', error.message);
      console.log('🔧 Falling back to in-memory database');
      this.initializeInMemoryDB();
    }
  }

  initializeInMemoryDB() {
    // In-memory storage for development
    this.users = [];
    this.subscriptions = [];
    this.usageLogs = [];
    this.apiKeys = [];
    
    // Add demo user
    this.seedDemoUser();
  }

  async seedDemoUser() {
    const passwordHash = await bcrypt.hash('1234', 12);
    
    const demoUser = {
      id: 1,
      username: 'freelancernasim',
      email: 'freelancernasim@example.com',
      password_hash: passwordHash,
      subscription_plan: 'Enterprise',
      created_at: new Date(),
      updated_at: new Date()
    };

    const demoSubscription = {
      id: 1,
      user_id: 1,
      plan_name: 'Enterprise',
      monthly_requests: -1, // Unlimited
      price_per_month: 40.00,
      features: JSON.stringify({
        unlimited_requests: true,
        all_features: true,
        priority_support: true,
        custom_models: true,
        team_collaboration: true
      }),
      is_active: true,
      created_at: new Date()
    };

    if (this.users) {
      // In-memory storage
      this.users.push(demoUser);
      this.subscriptions.push(demoSubscription);
    } else {
      // SQL Database
      await this.createUser(demoUser);
      await this.createSubscription(demoSubscription);
    }

    console.log('✅ Demo user created: freelancernasim/1234 (Enterprise)');
  }

  async createTables() {
    const createUsersTable = `
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' AND xtype='U')
      CREATE TABLE users (
        id INT PRIMARY KEY IDENTITY(1,1),
        username NVARCHAR(50) UNIQUE NOT NULL,
        email NVARCHAR(100) UNIQUE NOT NULL,
        password_hash NVARCHAR(255) NOT NULL,
        subscription_plan NVARCHAR(20) DEFAULT 'Free',
        created_at DATETIME2 DEFAULT GETDATE(),
        updated_at DATETIME2 DEFAULT GETDATE()
      )
    `;

    const createSubscriptionsTable = `
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='subscriptions' AND xtype='U')
      CREATE TABLE subscriptions (
        id INT PRIMARY KEY IDENTITY(1,1),
        user_id INT FOREIGN KEY REFERENCES users(id),
        plan_name NVARCHAR(20) NOT NULL,
        monthly_requests INT NOT NULL,
        price_per_month DECIMAL(10,2) NOT NULL,
        features NVARCHAR(MAX),
        is_active BIT DEFAULT 1,
        created_at DATETIME2 DEFAULT GETDATE()
      )
    `;

    const createUsageLogsTable = `
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='usage_logs' AND xtype='U')
      CREATE TABLE usage_logs (
        id INT PRIMARY KEY IDENTITY(1,1),
        user_id INT FOREIGN KEY REFERENCES users(id),
        request_type NVARCHAR(50),
        model_used NVARCHAR(50),
        tokens_used INT,
        cost DECIMAL(10,4),
        timestamp DATETIME2 DEFAULT GETDATE()
      )
    `;

    const createApiKeysTable = `
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='api_keys' AND xtype='U')
      CREATE TABLE api_keys (
        id INT PRIMARY KEY IDENTITY(1,1),
        user_id INT FOREIGN KEY REFERENCES users(id),
        key_hash NVARCHAR(255) NOT NULL,
        key_name NVARCHAR(100),
        is_active BIT DEFAULT 1,
        created_at DATETIME2 DEFAULT GETDATE(),
        expires_at DATETIME2
      )
    `;

    await this.pool.request().query(createUsersTable);
    await this.pool.request().query(createSubscriptionsTable);
    await this.pool.request().query(createUsageLogsTable);
    await this.pool.request().query(createApiKeysTable);
  }

  async seedDemoData() {
    // Check if demo user already exists
    const existingUser = await this.findUserByUsername('freelancernasim');
    if (!existingUser) {
      await this.seedDemoUser();
    }
  }

  // User methods
  async findUserByUsername(username) {
    if (this.users) {
      return this.users.find(u => u.username === username);
    }
    
    const result = await this.pool.request()
      .input('username', sql.NVarChar, username)
      .query('SELECT * FROM users WHERE username = @username');
    
    return result.recordset[0];
  }

  async findUserByEmail(email) {
    if (this.users) {
      return this.users.find(u => u.email === email);
    }
    
    const result = await this.pool.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT * FROM users WHERE email = @email');
    
    return result.recordset[0];
  }

  async findUserById(id) {
    if (this.users) {
      return this.users.find(u => u.id === id);
    }
    
    const result = await this.pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM users WHERE id = @id');
    
    return result.recordset[0];
  }

  async createUser(userData) {
    if (this.users) {
      const newUser = { ...userData, id: this.users.length + 1 };
      this.users.push(newUser);
      return newUser.id;
    }
    
    const result = await this.pool.request()
      .input('username', sql.NVarChar, userData.username)
      .input('email', sql.NVarChar, userData.email)
      .input('password_hash', sql.NVarChar, userData.password_hash)
      .input('subscription_plan', sql.NVarChar, userData.subscription_plan)
      .query(`
        INSERT INTO users (username, email, password_hash, subscription_plan)
        OUTPUT INSERTED.id
        VALUES (@username, @email, @password_hash, @subscription_plan)
      `);
    
    return result.recordset[0].id;
  }

  // Subscription methods
  async getUserSubscription(userId) {
    if (this.subscriptions) {
      return this.subscriptions.find(s => s.user_id === userId && s.is_active);
    }
    
    const result = await this.pool.request()
      .input('userId', sql.Int, userId)
      .query('SELECT * FROM subscriptions WHERE user_id = @userId AND is_active = 1');
    
    return result.recordset[0];
  }

  async createSubscription(subscriptionData) {
    if (this.subscriptions) {
      const newSub = { ...subscriptionData, id: this.subscriptions.length + 1 };
      this.subscriptions.push(newSub);
      return newSub.id;
    }
    
    const result = await this.pool.request()
      .input('user_id', sql.Int, subscriptionData.user_id)
      .input('plan_name', sql.NVarChar, subscriptionData.plan_name)
      .input('monthly_requests', sql.Int, subscriptionData.monthly_requests)
      .input('price_per_month', sql.Decimal, subscriptionData.price_per_month)
      .input('features', sql.NVarChar, subscriptionData.features)
      .query(`
        INSERT INTO subscriptions (user_id, plan_name, monthly_requests, price_per_month, features)
        OUTPUT INSERTED.id
        VALUES (@user_id, @plan_name, @monthly_requests, @price_per_month, @features)
      `);
    
    return result.recordset[0].id;
  }

  // Usage tracking methods
  async getUserUsage(userId) {
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
    
    if (this.usageLogs) {
      const monthlyLogs = this.usageLogs.filter(log => 
        log.user_id === userId && 
        log.timestamp.toISOString().slice(0, 7) === currentMonth
      );
      
      return {
        requests_used: monthlyLogs.length,
        requests_remaining: 'Unlimited', // For demo user
        total_cost: monthlyLogs.reduce((sum, log) => sum + (log.cost || 0), 0)
      };
    }
    
    // SQL implementation would go here
    return {
      requests_used: 0,
      requests_remaining: 'Unlimited',
      total_cost: 0
    };
  }

  async logUsage(usageData) {
    if (this.usageLogs) {
      const newLog = { ...usageData, id: this.usageLogs.length + 1, timestamp: new Date() };
      this.usageLogs.push(newLog);
      return newLog.id;
    }
    
    // SQL implementation would go here
    return 1;
  }
}
