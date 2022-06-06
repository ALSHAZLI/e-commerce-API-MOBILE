// import models
const Product = require('./Product');
const Category = require('./Category');
const Order = require('./Order');
const User = require('./User');
const Notification = require('./Notification');


//
User.hasMany(Order, {
  foreignKey: 'user_id',
  onDelete: 'set null'
})


Order.belongsTo(User, {
  foreignKey: 'user_id' 
})

User.hasMany(Notification, {
  foreignKey: 'user_id',
  onDelete: 'set null'
})


Notification.belongsTo(User, {
  foreignKey: 'user_id'
})


// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
})

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'set null'
})

// Products belongToMany Tags (through ProductTag). Allows products to have multiple tags


// Tags belongToMany Products (through ProductTag). Allows tags to have multiple products


module.exports = {
  Product,
  Category,
  User,
  Order,
  Notification,
};
