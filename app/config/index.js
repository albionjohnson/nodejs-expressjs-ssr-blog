require("dotenv").config();
const { Sequelize } = require("sequelize");

// connecting postgreSQL database
const sequelize = new Sequelize({
  database: process.env.DATABASE,
  username: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  port: 5432,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// testing connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.log("Unable to connect to the database:", error);
  });

// sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// taking references of all the instances for further use
const db = {};

db.blog = require("../models/model")(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
