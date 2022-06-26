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
const {upload} = require('../controll/uploadImage')

const adminLoginRoutes = require('./admin-login-routes')
const adminRegisterRoutes = require('./admin-register-routes')

const loginController = require('../controllers/loginController')
const { createTokens, validateToken } = require("../../JWT");
const  { createAdminTokens, validateAdminToken } = require("../../midellwaer/admin");





router.use('/categories',upload,categoryRoutes);
router.use('/notification', validateToken,notificationRoutes);
router.use('/products',upload, productRoutes);
router.use('/orders', orderRoutes);
router.use('/register',registerRoutes);
// router.use('/login',loginController.checkLoggedOut,loginRoutes);
router.use('/admin/login',adminLoginRoutes);
router.use('/admin/register',adminRegisterRoutes);
router.use('/login',loginRoutes);
router.use('/logout', logoutRoutes );
// router.use('/home',loginController.checkLoggedIn, homeRoutes );
router.use('/profile',profileRoutes);

  

module.exports = router;
