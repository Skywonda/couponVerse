require('dotenv').config();


module.exports = {
  db: {
    database_name: process.env.DB_NAME,
    database_password: process.env.DB_PASSWORD,
    database_user: process.env.DB_USER,

    server_database: process.env.SERVER_DB_URL
  }
}