const Joi = require("joi");

const registerSchma = Joi.object({
  fullname: Joi.string().min(3).max(20).required(),
  phone: Joi.string().max(10).min(10).required(),
  password: Joi.string().min(3).max(19).required(),
});

const updateProfileSchma = Joi.object({
    fullname: Joi.string().min(3).max(20),
    phone: Joi.string().max(10).min(10),
    password: Joi.string().min(3).max(19),
  }); 

const registerAdminSchma = Joi.object({
  fullname: Joi.string().min(3).max(20).required(),
  phone: Joi.string().max(10).min(10).required(),
  password: Joi.string().min(3).max(19).required(),
});

const categorySchma = Joi.object({
    category_name: Joi.string().min(3).max(30).required(),
    image: Joi.string().max(1820).required(),
  });

const productSchma = Joi.object().keys({
  //quantity description category_id
  name: Joi.string().max(30).required(),
  // image: Joi.string().max(1820),
  // description: Joi.string().max(1120),
  // price: Joi.number(),
  // category_id: Joi.number(),
  
});

const orderSchma = Joi.object({
  products: Joi.array().items(
    Joi.object().keys({
      //quantity
      id: Joi.number().integer().required(),
      name: Joi.string().min(3).max(30).required(),
      image: Joi.string().min(3).max(820).required(),
      price: Joi.number().required(),
      quantity: Joi.number().integer().required(),
    })
  ),

  total_price: Joi.number().required(),
  location: Joi.string().max(120).required(),
});

module.exports = {
  registerSchma,
  registerAdminSchma,
  orderSchma,
  productSchma,
  categorySchma,
  updateProfileSchma
};

//admintoool
