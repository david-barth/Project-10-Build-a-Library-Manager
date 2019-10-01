'use strict';

module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
    title: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: true, 
      }
    },
    author: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        notEmpty: true, 
      }
    },    
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER 
    }
  , {});
  book.associate = function(models) {
    // associations can be defined here
  };
  return book;
};


