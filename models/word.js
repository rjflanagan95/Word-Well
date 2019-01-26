// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Character" model that matches up with DB
var Word = sequelize.define("word", {
  text: Sequelize.STRING,
  wordDef: Sequelize.TEXT,
  wordEnt: Sequelize.TEXT,
  customDef: Sequelize.TEXT
}, {
  // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true
});

// Syncs with DB
Word.sync();

// Makes the Character Model available for other files (will also create a table)
module.exports = Word;