

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
    user_id: { // References the Category model's ID. This product belongs to one category.
      type: DataTypes.INTEGER,
      references: {
        model: 'user', 
        key: 'id'
      }
    },
   products: {
  //   { 
  //     "user_id": "4",
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
  //     "total_price" : 93.0,
  //     "location": "khartom city"
  //  }
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
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "order",
  }
);

module.exports = Order;
