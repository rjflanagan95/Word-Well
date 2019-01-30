var db = require("../models");

// module.exports = function(app) {
//   // Get all examples
//   app.get("/api/examples", function(req, res) {
//     db.Example.findAll({}).then(function(dbWords) {
//       res.json(dbWords);
//     });
//   });

//   // Create a new example
//   app.post("/api/examples", function(req, res) {
//     db.Example.create(req.body).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });

//   // Delete an example by id
//   app.delete("/api/examples/:id", function(req, res) {
//     db.Example.destroy({ where: { id: req.params.id } }).then(function(
//       dbExample
//     ) {
//       res.json(dbExample);
//     });
//   });
// };

module.exports = function(app) {
  // Get all examples
  app.get("/api/words", function(req, res) {
    db.Word.findAll({}).then(function(dbWords) {
      res.json(dbWords);
    });
  });

  // Create a new example
  app.post("/api/words", function(req, res) {
    db.Word.create(req.body).then(function(dbWord) {
      res.json(dbWord);
    });
  });

  // Delete an example by id
  app.delete("/api/words/:id", function(req, res) {
    db.Word.destroy({ where: { id: req.params.id } }).then(function(dbWord) {
      res.json(dbWord);
    });
  });
};
