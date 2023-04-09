const Sequelize = require("sequelize");
const config = require("../");

const { db } = config;

const sequelize = db.server_database
  ? new Sequelize(db.server_database)
  : new Sequelize(db.database_name, db.database_user, db.database_password, {
    host: process.env.DB_HOST,
    dialect: "postgres",
    // dialectOptions: {
    //   ssl: true
    // },
    logging: false,
  });

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    // console.error('Unable to connect to the database: ', error);
  });

module.exports = sequelize;
