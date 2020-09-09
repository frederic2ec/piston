// Base import
import * as path from "path";
const consola = require("consola");

// Express import
import * as express from "express";
const app = express();

// Express extensions
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as compression from "compression";
import * as helmet from "helmet";

// Global variables
let controllersDir: string;
let middlewaresDir: string;

// Initialze the app
export const init = () => {
  // Initialize cors
  app.use(cors());

  // Initialize body parser
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Intialize morgan for logging
  app.use(morgan("dev"));

  // Initialize compression
  app.use(compression());

  // Initialize helmet
  app.use(helmet());

  // Consola
  consola.info("Piston app initialize !");
};

// Initialize static direction
export const initStatic = (staticDir = "/public") => {
  const dir: string = path.join(process.cwd(), staticDir);
  app.use(express.static(dir));

  consola.info(`Static files directory initialized in : ${staticDir}`);
};

// Initialize view path
export const initView = (viewDir = "/views", engine = "ejs") => {
  app.set("views", path.join(process.cwd(), viewDir));

  app.set("view engine", engine);

  consola.info("Views ready !");
};

// Initialize the controller dir
export const initControllers = (controllersDirectory = "/controllers") => {
  controllersDir = path.join(process.cwd(), controllersDirectory);
};

// Initialize the middleware dir
export const initMiddlewares = (middlewaresDirectory = "/middlewares") => {
  middlewaresDir = path.join(process.cwd(), middlewaresDirectory);
};

// Initialize route file
export const initRouter = (routesFile = "/config/routes.js") => {
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
export const start = (port = "3000", host = "127.0.0.1") => {
  // Environment checker
  const nodeEnv = process.env.NODE_ENV || "development";
  if (nodeEnv !== "production" && process.env.PISTON_ENV !== "true") {
    consola.warn(
      `Piston is not running in production mode, it's recommended to use "piston serve"`
    );
  }
  // Listen app
  const listenPort = Number(process.env.PORT || port);
  const listenHost = process.env.HOST || host;
  app.listen(listenPort, listenHost, () => {
    consola.success(
      `Piston app listening at http://${listenHost}:${listenPort}`
    );
  });
};

// Middleware
export const middleware = (middlewareName: string): Function => {
  const { generateMiddleware } = require("./middleware");
  const generatedMiddleware = generateMiddleware(
    middlewaresDir,
    middlewareName
  );
  return generatedMiddleware;
};
