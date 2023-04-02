const Sequelize = require("sequelize");
const config = require("../");

const { db } = config;


const sequelize = db.server_database
  ? new Sequelize(db.server_database)
  : new Sequelize(db.database_name, db.database_user, db.database_password, {
    host: "localhost",
    dialect: "postgres",
    dialectOptions: {
      decimalNumbers: true,
    },
  });

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});


module.exports = sequelize;