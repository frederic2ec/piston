// Require piston
const piston = require("@piston/core");

function main() {
  // Init piston
  piston.init();

  // Init static folder
  piston.initStatic("public/");

  // Init view folder
  piston.initView("views/", "ejs");

  // Init middlwares folder
  piston.initMiddlewares("middlewares/");

  // Init controllers folder
  piston.initControllers("controllers/");

  // Init routes file
  piston.initRouter("config/routes.js");

  // Start piston
  piston.start();
}

// Export main
module.exports = main;
