const express = require("express");
var session = require('express-session')
const router = require('express').Router();

const loginController = require('../controllers/loginController')


 var app = express();


router.get('/',(req, res)=> {
  
    res.send('welcome to the home demo. refresh!');
  
})
//   router.get('/' ,(req, res) => {
//     return res.send("Home Page &^&^&^**$$");
// });

module.exports = router;