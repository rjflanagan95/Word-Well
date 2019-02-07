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
    dict(searchTerm, function(newWord) {
      res.json(newWord);
    });
    // db.Word.findOne({ where: { text : req.body }}).then(function(dbWords) {
    //   if (dbWords) {
    //     console.log("This word is already in your database");
    //   } else {
    //     console.log("Let's add the word to the database");
    //     dict(req.body, function(newWord) {
    //       res.json(newWord);
    //     });
    //   }
    // });
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
