module.exports = {
  "get /": "Home/Index",
  "get /test": "Home/Test",
  "get /middleware": "Home/MiddlewarePage",
  "/subrouter": {
    "get /": "Subrouter/index",
    "get /test": "Subrouter/test",
  },
};
