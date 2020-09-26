module.exports = {
  listen: {
    // Configure the default host (default : 127.0.0.1)
    host: process.env.HOST || "127.0.0.1",
    // Configure the port (default :3000)
    port: process.env.PORT || "3000",
  },
  app: {
    cors: true,
    bodyParser: true,
    morgan: true,
    compression: true,
    helmet: true,
  },
  // Configure the routes config files (default : config/routes.js)
  routes: "config/routes.js",
  // Configure the static folder (default : public/)
  static: "public/",
  // Configure the middlewares folder (default : middlwares/)
  middlewares: "middlewares/",
  // Configure the controllers folder (default : controllers/)
  controllers: "controllers/",
  // Configure the views engine (default : views/ and ejs)
  views: {
    directory: "views/",
    engine: "ejs",
  },
};
