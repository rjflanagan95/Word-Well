// module.exports = function(sequelize, DataTypes) {
//   var Example = sequelize.define("Example", {
//     text: DataTypes.STRING,
//     description: DataTypes.TEXT
//   });
//   return Example;
// };

module.exports = function(sequelize, DataTypes) {
  var Word = sequelize.define("Word", {
    text: DataTypes.STRING,
    definition: DataTypes.TEXT,
    etymology: DataTypes.TEXT,
    pronunciationLink: DataTypes.STRING,
    comment: DataTypes.TEXT
  });
  return Word;
};
