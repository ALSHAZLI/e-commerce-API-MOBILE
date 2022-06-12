
const router = require('express').Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createTokens, validateToken } = require("../../JWT");


router.post('/', async (req, res) => { // Creates a new User
    try{
      
    const { phone, fullname,password ,isAdmin} = req.body;
    const emailExists = await User.findOne({ where: { phone: phone } });
    if(!req.body){
      res.status(404).json("Phone and fyllname and password requierd !!")
    }
    if (emailExists ) {
      res.status(404).json("Phone already registered")
    }else{
    
    bcrypt.hash(password, 10).then((hash) => {
     User.create({
      fullname: fullname,
      phone: phone,
      password: hash,
      is_admin: 1
    })
      .then((user) => {
        
         const accessToken = createTokens(user);

        console.log(user.dataValues)
    
        return res.status(201).json({user});
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          return res.status(404).json({
            errors : err
          })
         
        }
      });
      
      });
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
  });

  module.exports = router;