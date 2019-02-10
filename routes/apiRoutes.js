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

    // check if the word being searched is already in the DB
    db.Word.findOne({ where: { text : searchTerm }}).then(function(dbWords) {
      if (dbWords) {
        // if it is, we're going to redirect to that word's page on the frontend
        res.json(dbWords);
      } else {
        // otherwise, get the info for the new word
        dict(searchTerm, function(newWord) {
          res.json(newWord);
        });
      }
    });
  });

  // Create a new word
  app.post("/api/words", function(req, res) {

    // check if the word is already in the DB
    db.Word.findOne({ where: { text : req.body.text }}).then(function(dbWords) {
      if (dbWords) {
        res.json(dbWords);
      } else {
        // if it's not, create the new word entry
        db.Word.create(req.body).then(function(dbWord) {
          res.json(dbWord);
        });
      }
    });
  });

  // Delete a word by id
  app.delete("/api/words/:id", function(req, res) {
    db.Word.destroy({ where: { id: req.params.id } }).then(function(dbWord) {
      res.json(dbWord);
    });
  });
};
