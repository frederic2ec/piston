// Require piston
const piston = require("@piston/core");

function main() {
  // Init piston
  piston.init();
  // Init static folder
  piston.initStatic("public/");

  // Init routes file
  piston.initRoutes("config/routes.js");

  // Start piston
  piston.start();
}

// Export main
module.exports = main;
