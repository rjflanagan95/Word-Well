var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Word.findAll({}).then(function(dbWords) {
      res.render("index", {
        words: dbWords
      });
    });
  });

  // Load word page and pass in a word by id
  app.get("/word/:id", function(req, res) {
    db.Word.findOne({ where: { id: req.params.id } }).then(function(dbWord) {
      res.render("word", {
        word: dbWord
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
