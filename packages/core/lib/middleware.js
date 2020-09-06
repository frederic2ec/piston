// Basic require
const path = require("path");
const consola = require("consola");

module.exports.generateMiddleware = (middlewaresDir, middlewareName) => {
  // Split the string in an array
  const middlewareArray = middlewareName.split("/");

  // Check if middleware array length is good
  if (middlewareArray.length > 2 || middlewareArray.length < 1) {
    consola.error("Controller file error : middleware length incorrect");
    return;
  }

  let middlewareFile;
  let middlewareFn;
  try {
    middlewareFile = require(path.join(
      middlewaresDir,
      `${middlewareArray[0]}.middleware.js`
    ));

    // Return middleware function
    middlewareFn = middlewareFile[middlewareArray[1]];
    // Check if middleware is undefined
    if (!middlewareFn) {
      throw "middleware undefined";
    }
  } catch (e) {
    // Return an empty middleware if non exist
    middlewareFn = (_, __, next) => {
      next();
    };
  }
  return middlewareFn;
};
