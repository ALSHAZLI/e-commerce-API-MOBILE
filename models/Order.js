

const { Model, DataTypes } = require("sequelize");
const uuid = require('uuid/v4');
var db = require("../config/connection");

(sequelize = db.sequelize), (Sequelize = db.Sequelize);

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: { // References the Uesr model's ID. This Order belongs to one User.
      type: DataTypes.INTEGER,
      references: {
        model: 'user', 
        key: 'id'
      }
    },
   products: {
  //     "products":[{
  //          "id":4,
  //          "name":"iphone",
  //          "image":"http://image.com",
  //          "quantity":2,
  //          "price": 22.0
  //        },
  //        {
  //          "id":5,
  //          "name":"iphone22",
  //          "image":"http://22image.com",
  //          "quantity":3,
  //          "price": 42.0
  //        }
  //        ],
  
      type: DataTypes.JSON,
        allowNull: false,
        validate: {
          notNull: true
        }
    
  },
    total_price : {
      type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        validate: {
          isDecimal: true, 
          notNull: true
        }
    }
    ,createdAt:{
      type: DataTypes.DATE,
      defaultValue: null
  },updatedAt:{
      type: DataTypes.DATE,
      defaultValue: null
  },
    location:{
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true
        }
    },
   
	

  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "order",
  }
);

module.exports = Order; 
