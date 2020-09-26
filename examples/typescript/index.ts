import * as piston from "@piston/core";

// You can specifig the application config file (default config/application.js)
module.exports = () => piston.start("config/application.ts");
