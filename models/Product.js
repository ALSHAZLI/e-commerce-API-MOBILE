// Import sequelize library
const { Model, DataTypes } = require('sequelize'); 

// Import our database connection from config.js
var db = require('../config/connection'); 

    sequelize = db.sequelize,
    Sequelize = db.Sequelize;

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// Set up product table
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      validate: {
        isDecimal: true, 
        notNull: true
      }
    }, 
    description: {
      type: DataTypes.STRING,
      allowNull: false,
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
    },
    category_id: { // References the Category model's ID. This product belongs to one category.
      type: DataTypes.INTEGER,
      references: {
        model: 'category', 
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
