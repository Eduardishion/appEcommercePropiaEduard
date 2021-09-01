require('dotenv').config()

module.exports = {
  "development": {
    "username": "root",
    "password": "12345",
    "database": "DB_ecommerce_v2",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port": "3307"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.USER,
    "password": process.env.PASSWORD,
    "database": process.env.DB,
    "host": process.env.HOST,
    "dialect": "mysql",
    "port": process.env.PORT
  }
}
