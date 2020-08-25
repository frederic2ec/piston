module.exports = {
  Index: (req, res) => {
    return res.render("index", { data: "test 124" });
  },
  Test: (req, res) => {
    return res.send("Test");
  },
};
