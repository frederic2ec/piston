const { middleware } = require("@piston/core");

module.exports.Index = (req, res) => {
  return res.render("index", { data: "test 124" });
};

module.exports.Test = (req, res) => {
  return res.send("Test");
};

module.exports.MiddlewarePage = {
  Middleware: [middleware("Auth/NotAuthed"), middleware("Auth/Authed")],
  View: (req, res) => {
    return res.send("If you see that the middleware have not failed");
  },
};
