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
const init = (
  corsCfg = true,
  bodyParserCfg = true,
  morganCfg = true,
  compressionCfg = true,
  helmetCfg = true
) => {
  // Initialize cors
  if (corsCfg) {
    app.use(cors());
  }

  // Initialize body parser
  if (bodyParserCfg) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
  }

  // Intialize morgan for logging
  if (morganCfg) {
    app.use(morgan("dev"));
  }

  // Initialize compression
  if (compressionCfg) {
    app.use(compression());
  }

  // Initialize helmet
  if (helmetCfg) {
    app.use(helmet());
  }

  // Consola
  consola.info("Piston app initialize !");
};

// Initialize static direction
const initStatic = (dir = "public/") => {
  app.use(express.static(path.join(process.cwd(), dir)));

  consola.info(`Static files directory initialized in : ${dir}`);
};

// Initialize view path
const initView = (viewDir = "/views", engine = "ejs") => {
  app.set("views", path.join(process.cwd(), viewDir));

  app.set("view engine", engine);

  consola.info("Views ready !");
};

// Initialize the controller dir
const initControllers = (controllersDirectory = "/controllers") => {
  controllersDir = path.join(process.cwd(), controllersDirectory);
};

// Initialize the middleware dir
const initMiddlewares = (middlewaresDirectory = "/middlewares") => {
  middlewaresDir = path.join(process.cwd(), middlewaresDirectory);
};

// Initialize route file
const initRouter = (routesFile = "/config/routes.js") => {
  // Require routes files
  const routes = require(path.join(process.cwd(), routesFile));

  // Generate routes
  const { generateRouter } = require("./routes");
  const generatedRouter = generateRouter(routes, controllersDir);

  // Add route to expresss
  app.use("", generatedRouter);
  consola.info("Router ready !");
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

// Start the app
export const start = (configFile = "config/application.js") => {
  // Import the config file
  let config;
  try {
    config = require(path.join(process.cwd(), configFile));
  } catch {
    config = undefined;
  }

  // Environment checker
  const nodeEnv = process.env.NODE_ENV || "development";
  if (nodeEnv !== "production" && process.env.PISTON_ENV !== "true") {
    consola.warn(
      `Piston is not running in production mode, it's recommended to use "piston serve"`
    );
  }
  // Preflight
  config?.preflight;
  // Launch the different launch phase
  init(
    config?.app.cors,
    config?.app.bodyParser,
    config?.app.morgan,
    config?.app.compression,
    config?.app.helmet
  );
  initStatic(config?.static);
  initView(config?.views.directory, config?.views.engine);
  initMiddlewares(config?.middlewares);
  initControllers(config?.controllers);
  initRouter(config?.routes);

  // Listen app
  const listenPort = Number(process.env.PORT || config?.listen.port || "3000");
  const listenHost = process.env.HOST || config?.listen.host || "127.0.1";
  app.listen(listenPort, listenHost, () => {
    consola.success(
      `Piston app listening at http://${listenHost}:${listenPort}`
    );
  });
};
