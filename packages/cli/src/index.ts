#!/usr/bin/env node
// Basic import
import * as caporal from "caporal";
import * as pjson from "./package.json";

// Command import
import serve from "./serve";

caporal
  .version(pjson.version)
  .command("serve", "Start serving the Piston app")
  .option("--host <host>", "Bind the host to another address (optional)")
  .option("--port <port>", "Bind the port to another port (optional)")
  .action((_, options: object, __) => {
    serve(options);
  });

caporal.parse(process.argv);
