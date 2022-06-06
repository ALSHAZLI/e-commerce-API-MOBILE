const express = require('express');
const router = require('express').Router();


var app = express();

const { initPassportLocal } = require("../controllers/passportLocalController");


const notificationRoutes = require("./notification-routes");
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const registerRoutes = require('./register-routes');
const loginRoutes = require('./login-routes');
const profileRoutes = require('./profile-routes');
const logoutRoutes = require('./logout-routes');
const homeRoutes = require('./home-routes');
const orderRoutes = require('./order-routes')
const loginController = require('../controllers/loginController')
const { createTokens, validateToken } = require("../../JWT");





router.use('/categories', categoryRoutes);
router.use('/notification', notificationRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/register',registerRoutes);
router.use('/login',loginController.checkLoggedOut,loginRoutes);
router.use('/logout',  loginController.postLogOut,logoutRoutes);
// router.use('/home',loginController.checkLoggedIn,homeRoutes);
router.use('/profile',validateToken,profileRoutes);



module.exports = router;
