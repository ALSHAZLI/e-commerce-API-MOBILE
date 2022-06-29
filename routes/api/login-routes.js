
session = require('express-session');
const router = require('express').Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const { createTokens, validateToken } = require("../../JWT");




  router.get('/',validateToken,(req, res)=> {
    return res.status(201).json({ message: "login page you dont need to login agine !!!! " });
    // return res.redirect(201,"/home");
  })

router.post('/', async (req, res) => { 

    
  try{
    const { phone,password } = req.body;
 
   // req.body = {
     // "phone":"09220521",
     // "password":"gbggeeee"
  //}
    const user = await User.findOne({ where: { phone: phone } });
    if (!user ) {
      res.status(404).json("Authentication failed ---- user Phone not found");
    }else{
    
        const validPassword = await bcrypt.compare(password, user.get("password"));
    
        if (!validPassword) {
          console.log("Password is not valid");
          return res.status(404).json({ message: "Authentication failed Password is not valid" });
        }
         const accessToken = createTokens(user);
    
        //   res.cookie("access-token", accessToken, {
        //     maxAge: 60 * 60 * 24 * 30 * 1000,
        //     httpOnly: true,
        //   });
          console.log(user.dataValues);
          
          
          const token =  accessToken; 
          
    
        return res.status(201).header("x-auth-token",token).json({user: user.dataValues,token : token});
        //   console.log(user);
    }
  }catch(err){
    res.status(500).json("Authentication failed for Login ----");
    console.log(err);
  }
});

module.exports = router;