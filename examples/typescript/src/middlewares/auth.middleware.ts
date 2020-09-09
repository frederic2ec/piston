module.exports.NotAuthed = (_: any, __: any, next: any) => {
  next();
};

module.exports.Authed = (_: any, res: any, __: any) => {
  res.send("This is the authed middleware");
};
