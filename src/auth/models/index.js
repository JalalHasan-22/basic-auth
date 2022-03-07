"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const Users = require("./user-model");

require("dotenv").config();

const POSTGRES_URL =
  process.env.NODE_ENV === "test" ? "sqlite:memory" : process.env.DATABASE_URL;

const sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

const sequelize = new Sequelize(POSTGRES_URL, {});

module.exports = {
  db: sequelize,
  users: Users(sequelize, DataTypes),
};
