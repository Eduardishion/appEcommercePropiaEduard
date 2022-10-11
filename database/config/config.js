require('dotenv').config()

module.exports = {
  "development": {
    "username": "root",
    "password": "12345",
    "database": "DB_ecommerce_v2",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port": "3306"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username":  process.env.USERNAME_DB,
    "password":  process.env.PASSWORD_DB,
    "database":  process.env.DATABASE_DB,
    "host": process.env.HOST_DB,
    "dialect": process.env.DIALECT_DB,
    "port": process.env.PORT_DB
  }
}
