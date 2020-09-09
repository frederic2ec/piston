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

  process.env.PISTON_ENV = "true";

  // Get app package.json
  let ajson: any;
  try {
    ajson = require(path.join(process.cwd(), "package.json"));
  } catch {
    ajson = "";
  }
  const mainfile = ajson.main || "index.js";

  const mainapp = require(path.join(process.cwd(), mainfile));
  try {
    return mainapp.default();
  } catch {
    return mainapp();
  }
}
