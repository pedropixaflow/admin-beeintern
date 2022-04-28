const Sequelize = require("sequelize");
const db = require("../database/db");

const User = db.sequelize.define(
  "admin",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      autoIncrement: false,
    },
    login: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    permission: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },

    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

// User.sync({ force: true });

module.exports = User;
