"use strict";

const bcrypt = require("bcrypt");
const base_64 = require("base-64");
const { users } = require("../models/index");

async function basicAuth(req, res, next) {
  try {
    const encoded = req.headers.authorization.split(" ")[1]; //req.headers.authorization.split(" ").pop()
    const decoded = base_64.decode(encoded);
    const [username, password] = decoded.split(":");
    const user = await users.findOne({ where: { username } });

    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      req.user = user;
      next();
    } else next("Incorrect username / password");
    // next("Incorrect username / password");
  } catch (error) {
    console.error(error);
    next(error.message);
  }
}

module.exports = basicAuth;
