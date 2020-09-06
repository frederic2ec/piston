"use strict";
// Base require
const path = require("path");
const consola = require("consola");

// Express require
const express = require("express");
const app = express();

// Express addons
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");

// Variable
let controllersDir;
let middlewaresDir;

// Initialize the app with basic stuff
module.exports.init = () => {
  // Initialize CORS
  app.use(cors());

  // Initialize body parser
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Initialize morgan for logging
  app.use(morgan("dev"));

  // Initialize compression
  app.use(compression());

  // Initialize helmet
  app.use(helmet());

  consola.info("Piston app initialized !");
};

// Initialize static directory
module.exports.initStatic = (staticDir = "/public") => {
  const dir = path.join(process.cwd(), staticDir);
  app.use(express.static(dir));

  consola.info(`Static files directory initialized in : ${staticDir}`);
};

// Initialize view path
module.exports.initView = (viewDir = "/views", engine = "ejs") => {
  app.set("views", path.join(process.cwd(), viewDir));

  app.set("view engine", engine);

  consola.info("Views ready !");
};

// Initialize the controller dir
module.exports.initControllers = (controllersDirectory = "/controllers") => {
  controllersDir = path.join(process.cwd(), controllersDirectory);
};

// Initialize the middleware dir
module.exports.initMiddlewares = (middlewaresDirectory = "/middlewares") => {
  middlewaresDir = path.join(process.cwd(), middlewaresDirectory);
};

// Initialize route file
module.exports.initRouter = (routesFile = "/config/routes.js") => {
  // Require routes files
  const routes = require(path.join(process.cwd(), routesFile));

  // Generate routes
  const { generateRouter } = require("./routes.js");
  const generatedRouter = generateRouter(routes, controllersDir);

  // Add route to expresss
  app.use("", generatedRouter);
  consola.info("Router ready !");
};

// Start the app
module.exports.start = (port = "3000", host = "127.0.0.1") => {
  // Environment checker
  const nodeEnv = process.env.NODE_ENV || "development";
  if (nodeEnv !== "production" && process.env.PISTON_ENV !== "true") {
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

// Middleware
module.exports.middleware = (middlewareName) => {
  const { generateMiddleware } = require("./middleware");
  const generatedMiddleware = generateMiddleware(
    middlewaresDir,
    middlewareName
  );
  return generatedMiddleware;
};
