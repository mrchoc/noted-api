const { createLogger, format, transports } = require("winston");
require("express-async-errors");

logger = createLogger({
  transports: [
    new transports.Console({
      colorize: true,
      prettyPrint: true,
      format: format.combine(format.splat(), format.simple()),
    }),
    new transports.File({
      filename: "logfile.log",
    }),
  ],
  exceptionHandlers: [
    new transports.Console({
      colorize: true,
      prettyPrint: true,
      format: format.combine(format.splat(), format.simple()),
    }),
    new transports.File({
      filename: "uncaughtExceptions.log",
    }),
  ],
});

module.exports = logger;
