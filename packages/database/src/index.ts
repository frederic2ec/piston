// Import the modules
import * as path from "path";
import * as glob from "glob";
import * as Mongoose from "mongoose";
const consola = require("consola");

// Init the database
export const initDB = (databaseFile = "config/database.js") => {
  // Require the config file
  let databaseCfg;
  try {
    databaseCfg = require(path.join(process.cwd(), databaseFile));
  } catch {
    databaseCfg = undefined;
  }

  // Select the right config depending on the environment
  const config =
    process.env.NODE_ENV === "production"
      ? databaseCfg.production
      : databaseCfg.development;

  // Connect to the database
  if (config.uri) {
    Mongoose.connect(config.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } else {
    // Build the full username string
    let fullUser = "";
    if (config.username) {
      if (config.password) {
        fullUser = `${config.username}:${config.password}@`;
      } else {
        fullUser = `${config.username}@`;
      }
    }
    // Other configuration
    const host: string = config.host || "127.0.0.1";
    const port: string = config.port || "27017";
    const database: string = config.database || "piston";
    // Connect to the database
    Mongoose.connect(`mongodb://${fullUser}${host}:${port}/${database}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  // Log the connection
  Mongoose.connection.on("error", () => {
    consola.error("Failed to connect to the database !");
  });
  Mongoose.connection.once("open", () => {
    consola.info("Successfully connected to the database !");
  });

  // Logging
  Mongoose.set("debug", process.env.NODE_ENV !== "production");

  // Create and init all models
  initModels(databaseCfg?.models);
};

const initModels = (modelsFolder = "models/") => {
  // Get the extension depending on the environment
  const modelExt = process.env.PISTON_TS ? "ts" : "js";
  // Get all models in the models folder
  glob(
    `${path.join(process.cwd(), modelsFolder)}*.model.${modelExt}`,
    {},
    (_: any, files: string[]) => {
      // Go through all the file
      files.forEach((file) => {
        // Get the model
        const model = require(file);
        // Get model name
        const name = path.basename(file, `.model.${modelExt}`);
        // Captelize name
        const captName =
          name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        // Create model
        Mongoose.model(captName, model);
      });
    }
  );
};

// Export mongoose
export const mongoose = Mongoose;

// Get a model
export const model = (modelName: string) => Mongoose.model(modelName);
