var db = require("../models");

var dict = require("../public/js/oxfordLib");

module.exports = function(app) {
  // Get all words
  app.get("/api/words", function(req, res) {
    db.Word.findAll({}).then(function(dbWords) {
      res.json(dbWords);
    });
  });

  app.get("/api/random", function(req, res) {
    dict(function(newWord) {
      console.log(newWord);
      res.json(newWord);
    });
  });

  // Create a new word
  app.post("/api/words", function(req, res) {
    db.Word.create(req.body).then(function(dbWord) {
      res.json(dbWord);
    });
  });

  // Delete a word by id
  app.delete("/api/words/:id", function(req, res) {
    db.Word.destroy({ where: { id: req.params.id } }).then(function(dbWord) {
      res.json(dbWord);
    });
  });
};
