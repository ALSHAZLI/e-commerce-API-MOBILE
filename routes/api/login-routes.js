
session = require('express-session');
const router = require('express').Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const { createTokens, validateToken } = require("../../JWT");




  router.get('/',(req, res)=> {
    return res.status(201).json({ message: "login page " });
    // return res.redirect(201,"/home");
  })

router.post('/', async (req, res) => { 

    

    const { phone,password } = req.body;
    const user = await User.findOne({ where: { phone: phone } });
    if (!user ) {
      res.status(404).json("Authentication failed ---- user Phone not found")
    }else{
    
        const validPassword = await bcrypt.compare(password, user.get("password"));
    
        if (!validPassword) {
          console.log("Password is not valid");
          return res.status(401).json({ message: "Authentication failed" });
        }
        const accessToken = createTokens(user);
    
          res.cookie("access-token", accessToken, {
            maxAge: 60 * 60 * 24 * 30 * 1000,
            httpOnly: true,
          });
          console.log(user.dataValues);
          
          
         
          
    
        return res.status(201).json(user.dataValues);
        //   console.log(user);
    }
});

module.exports = router;