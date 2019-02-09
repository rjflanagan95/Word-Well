var db = require("../models");

var dict = require("../public/js/oxfordLib");

module.exports = function(app) {
  // Get all words
  app.get("/api/words", function(req, res) {
    db.Word.findAll({}).then(function(dbWords) {
      res.json(dbWords);
    });
  });

  // Get one random word from the dictionary API
  app.get("/api/random", function(req, res) {
    var searchTerm = "random";
    dict(searchTerm, function(newWord) {
      res.json(newWord);
    });
  });

  app.post("/api/search", function(req, res) {
    var searchTerm = req.body.text;
    searchTerm = searchTerm.replace(/['"]+/g, '');

    db.Word.findOne({ where: { text : searchTerm }}).then(function(dbWords) {
      if (dbWords) {
        // if the word is already in the database, redirect to that word's page
        res.json(dbWords);
        // res.redirect("/word/" + dbWords.id);
      } else {
        // otherwise, get all the info for the new word
        dict(searchTerm, function(newWord) {
          res.json(newWord);
        });
      }
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
