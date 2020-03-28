const { resolve } = require('path')

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: resolve(__dirname, 'src', 'database', 'db.sqlite')
    },
    migrations: {
      directory: resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: resolve(__dirname, 'src', 'database', 'test.sqlite')
    },
    migrations: {
      directory: resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: resolve(__dirname, 'src', 'database', 'db.sqlite')
    },
    migrations: {
      directory: resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true
  }
};
