"use strict";
// Base require
const path = require("path");
const consola = require("consola");

// Express require
const express = require("express");
const app = express();

// Initialize static directory
module.exports.initStatic = (staticDir = "/public") => {
  const dir = path.join(process.cwd(), staticDir);
  app.use(express.static(dir));

  consola.info(`Static files directory initialized in : ${staticDir}`);
};

// Start the app
module.exports.start = (port = "3000", host = "127.0.0.1") => {
  // Environment checker
  const nodeEnv = process.env.NODE_ENV || "development";
  if (nodeEnv !== "production") {
    consola.warn(
      `Piston is not running in production mode, it's recommended to use "piston serve"`
    );
  }
  // Listen app
  const listenPort = process.env.PORT || port;
  const listenHost = process.env.HOST || host;
  app.listen(listenPort, listenHost, () => {
    consola.success(
      `Piston app listening at http://${listenHost}:${listenPort}`
    );
  });
};
