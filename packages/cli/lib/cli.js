#!/usr/bin/env node
"use strict";
// Basic require
const caporal = require("caporal");
const pjson = require("../package.json");

// Command require
const serve = require("./serve");

caporal
  .version(pjson.version)
  .command("serve", "Start serving the Piston app")
  .option("--host <host>", "Bind the host to another address (optional)")
  .option("--port <port>", "Bind the port to another port (optional)")
  .action((args, options, logger) => {
    serve(options);
  });

caporal.parse(process.argv);
