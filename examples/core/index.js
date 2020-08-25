// Require piston
const piston = require("@piston/core");

function main() {
  // Init piston
  piston.init();

  // Init static folder
  piston.initStatic("public/");

  // Init view folder
  piston.initView("views/");

  // Init controller folder
  piston.initController("controllers/");

  // Init routes file
  piston.initRouter("config/routes.js");

  // Start piston
  piston.start();
}

// Export main
module.exports = main;
