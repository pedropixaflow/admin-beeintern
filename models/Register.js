const Sequelize = require("sequelize");
const db = require("../database/db");

const Register = db.sequelize.define(
  "register",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false,
    },
    name: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    work: {
      type: Sequelize.STRING,
    },
    learn: {
      type: Sequelize.STRING,
    },
    skills: {
      type: Sequelize.STRING,
    },
    about: {
      type: Sequelize.TEXT,
    },
    linkedin: {
      type: Sequelize.STRING,
    },
    currency: {
      type: Sequelize.STRING,
    },
    unpaidInternship: {
      type: Sequelize.STRING,
    },
    salary: {
      type: Sequelize.DECIMAL(10, 2),
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

// Register.sync({ force: true })

module.exports = Register;
