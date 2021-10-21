const winston = require("winston");
const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const app = express();

require("./startup/logging");
require("./startup/cors")(app);
require("./startup/routes")(app);

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  logger.info(`Listening on port ${port}...`)
);
const db = config.get("db");
mongoose.connect(db).then(() => logger.info(`Connected to ${db}...`));
mongoose.Schema.Types.String.checkRequired((v) => typeof v === "string");

module.exports = server;
