const express = require("express");
const notes = require("../routes/notes");
const users = require("../routes/users");
const auth = require("../routes/auth");
const options = require("../middleware/options");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/notes", notes);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(options);
};
