module.exports = function(sequelize, DataTypes) {
  var Word = sequelize.define("Word", {
    text: DataTypes.STRING,
    definition: DataTypes.TEXT,
    etymology: DataTypes.TEXT,
    pronunciation: DataTypes.STRING,
    comment: DataTypes.TEXT
  });
  return Word;
};
