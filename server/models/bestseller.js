"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bestseller extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bestseller.init(
    {
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      publisher: DataTypes.STRING,
      coverimg: DataTypes.STRING,
      description: DataTypes.STRING,
      isbn13: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Bestseller",
    }
  );
  return Bestseller;
};
