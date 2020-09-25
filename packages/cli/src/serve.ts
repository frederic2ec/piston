// Basic import
import * as path from "path";

export default function (options: any): Function {
  // Set environment variable
  if (options.host) {
    process.env.HOST = options.host;
  }
  if (options.port) {
    process.env.PORT = options.port;
  }
  if (options.typescript) {
    process.env.PISTON_TS = "true";
  }

  process.env.PISTON_ENV = "true";

  // Get app package.json
  let ajson: any;
  try {
    ajson = require(path.join(process.cwd(), "package.json"));
  } catch {
    ajson = "";
  }
  const mainfile = ajson.main || "index.js";

  if (options.typescript) {
    require("ts-node").register();
    return require(path.join(process.cwd(), mainfile))();
  }

  return require(path.join(process.cwd(), mainfile))();
}
