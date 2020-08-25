// Express require
const express = require("express");

function generateRouter(routes) {
  // Initialize express router
  const router = express.Router();

  // Start looping on each entries
  for (const [route, controller] of Object.entries(routes)) {
    // Split the string in an array
    const routeArray = route.split(/(\s+)/).filter((e) => e.trim().length > 0);
    // Check if the routes array is 2 or less
    if (routeArray.length > 2) {
      consola.error("Routes file error : Route length incorrect");
      return;
    }
    // Detect if the controller is an object
    if (typeof controller === "object") {
      // Generate a new router
      const nestedGeneratedRoute = generateRouter(controller);
      router.use(routeArray[0], nestedGeneratedRoute);
    } else {
      // Add route to the router
      router[routeArray[0]](routeArray[1], function (_, res) {
        // TODO Call the controller
        res.send(controller);
      });
    }
  }

  // Return the router
  return router;
}

module.exports.generateRouter = generateRouter;
