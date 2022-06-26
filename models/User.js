const { Model, DataTypes } = require('sequelize');

var db = require('../config/connection'); 

    sequelize = db.sequelize,
    Sequelize = db.Sequelize;
// htp:hmgnhgnb /../../.././.
class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true
      }
    }
    ,
    phone: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true
      }
    },
    is_admin: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },createdAt:{
      type: DataTypes.DATE,
      defaultValue: null
  },updatedAt:{
      type: DataTypes.DATE,
      defaultValue: null
  }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
