// Require piston
const piston = require("@piston/core");

function main() {
  // Init static folder
  piston.initStatic("public/");

  // Start piston
  piston.start();
}

// Run main and export
module.exports = main;
