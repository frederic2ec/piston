// Basic require
import * as path from "path";
const consola = require("consola");

// Express require
import * as express from "express";

export const generateRouter = (
  routes: string | object,
  controllerDir: string
): express.Router | any => {
  // Initialize express router
  const router: express.Router | any = express.Router();

  // Start looping on each entries
  for (const [route, controller] of Object.entries(routes)) {
    // Split the string in an array
    const routeArray: string[] = route
      .split(/(\s+)/)
      .filter((e) => e.trim().length > 0);
    // Check if the routes array is 2 or less
    if (routeArray.length > 2 || routeArray.length < 1) {
      consola.error("Routes file error : Route length incorrect");
      return;
    }
    // Detect if the controller is an object
    if (typeof controller === "object") {
      // Generate a new router
      const nestedGeneratedRoute: any = generateRouter(
        controller,
        controllerDir
      );
      router.use(routeArray[0], nestedGeneratedRoute);
    } else {
      // Split the string to get the controller and function names
      const controllerArray = controller.split("/");
      // Check if the controller array is 2
      if (controllerArray.length !== 2) {
        consola.error("Routes file error : Controller length incorrect");
        return;
      }
      // Try getting the controller file
      let controllerFile;
      const controllerExt = process.env.PISTON_TS ? "ts" : "js";
      try {
        controllerFile = require(path.join(
          controllerDir,
          `${controllerArray[0]}.controller.${controllerExt}`
        ));

        // Add route to the router
        if (typeof controllerFile[controllerArray[1]] === "object") {
          const middlewares = controllerFile[controllerArray[1]].Middleware;

          router[routeArray[0]](
            routeArray[1],
            ...middlewares,
            controllerFile[controllerArray[1]].View
          );
        } else {
          router[routeArray[0]](
            routeArray[1],
            controllerFile[controllerArray[1]]
          );
        }
      } catch (e) {
        router[routeArray[0]](routeArray[1], (_: any, res: any) => {
          res.send("No controller found !");
        });
      }
    }
  }

  // Return the router
  return router;
};
