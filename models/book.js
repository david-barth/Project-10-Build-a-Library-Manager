'use strict';
module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    genre: DataTypes.STRING,
    date: DataTypes.INTEGER
  }, {});
  book.associate = function(models) {
    // associations can be defined here
  };
  return book;
};