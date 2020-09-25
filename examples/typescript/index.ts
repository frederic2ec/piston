import * as piston from "@piston/core";

module.exports = () => {
  // init piston
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
  piston.initRouter("config/routes.ts");

  // Start piston
  piston.start();
};
