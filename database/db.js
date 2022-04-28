const Sequelize = require("sequelize");
const db = {};
const db_options = {
  production: {
    host: "us-cdbr-east-05.cleardb.net",
    db: "heroku_d03afc20cf2502a",
    user: "b950d4e1aa1a2a",
    password: "f97f4a69",
    logging: false,
  },
  development: {
    host: "",
    db: "",
    user: "",
    password: "",
    logging: true,
  },
};

let db_config = {};
db_config = db_options.production;

const sequelize = new Sequelize(
  db_config.db,
  db_config.user,
  db_config.password,
  {
    logging: db_config.logging,
    host: db_config.host,
    dialect: "mysql",

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    timezone: "-03:00",
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
