module.exports.NotAuthed = (req, res, next) => {
  next();
};

module.exports.Authed = (req, res, next) => {
  res.send("This is the authed middleware");
};
