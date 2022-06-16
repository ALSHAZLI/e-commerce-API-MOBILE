const { Model, DataTypes } = require('sequelize');

var db = require('../config/connection'); 

    sequelize = db.sequelize,
    Sequelize = db.Sequelize;

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;

