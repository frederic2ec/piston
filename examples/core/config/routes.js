module.exports = {
  "get /": "Home/Index",
  "get /test": "Home/Test",
  "/subrouter": {
    "get /": "Subrouter/index",
    "get /test": "Subrouter/test",
  },
};
