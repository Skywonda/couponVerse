const express = require("express");
const morgan = require('morgan')
require("express-async-errors");

const sequelize = require("./config/provider/db.js");
const router = require("./router");
const errorHandler = require("./middleware/errrorHandler");
const command = require("./command.js");

const app = express();
PORT = process.env.PORT || 8000;

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("You are welcome in the name of the lord!");
});

app.use(router);

app.use(errorHandler);

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
  command()
});
