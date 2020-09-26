module.exports = {
  models: "models/",
  // development : { username: "", password: "", host: "", port: "", database: "" },
  development: { uri: process.env.DATABASE_URL },
  production: { uri: process.env.DATABASE_URL },
};
