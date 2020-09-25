// Basic require
import * as path from "path";
const consola = require("consola");

export const generateMiddleware = (
  middlewaresDir: string,
  middlewareName: string
): Function | any => {
  // Split the string in an array
  const middlewareArray: string[] = middlewareName.split("/");

  // Check if middleware array length is good
  if (middlewareArray.length > 2 || middlewareArray.length < 1) {
    consola.error("Controller file error : middleware length incorrect");
    return;
  }

  let middlewareFile: NodeRequire | any;
  let middlewareFn: Function | any;
  const middlewareExt = process.env.PISTON_TS ? "ts" : "js";
  try {
    middlewareFile = require(path.join(
      middlewaresDir,
      `${middlewareArray[0]}.middleware.${middlewareExt}`
    ));

    // Return middleware function
    middlewareFn = middlewareFile[middlewareArray[1]];
    // Check if middleware is undefined
    if (!middlewareFn) {
      throw "middleware undefined";
    }
  } catch (e) {
    // Return an empty middleware if non exist
    middlewareFn = (_: any, __: any, next: Function) => {
      next();
    };
  }
  return middlewareFn;
};
