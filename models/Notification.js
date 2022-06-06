// Import sequelize library
const { Model, DataTypes } = require('sequelize'); 

// Import our database connection from config.js
var db = require('../config/connection'); 

    sequelize = db.sequelize,
    Sequelize = db.Sequelize;

// Initialize Product model (table) by extending off Sequelize's Model class
class Notification extends Model {}

// Set up product table
Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true 
      }
    },
    data: {
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
    user_id: { // References the Category model's ID. This product belongs to one category.
      type: DataTypes.INTEGER,
      references: {
        model: 'user', 
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'notification',
  }
);

module.exports = Notification;
