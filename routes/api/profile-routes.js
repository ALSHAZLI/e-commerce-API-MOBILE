const router = require('express').Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
var bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json());
const { sign, verify } = require("jsonwebtoken");

const { createTokens, validateToken } = require("../../JWT");


router.get('/', (req, res) => {
  const accessToken = req.header("x-auth-token");

  if (!accessToken)
  
    return res.status(400).json({ error: "User not Authenticated!@@@@@" });

  try {
    const validToken = verify(accessToken, "jwtsecretplschange",async (err,decodedtoken)=>{
      if(err){
        console.log(err.message);
        next();
      }
      console.log(decodedtoken.id)
      let user  = await User.findOne({where: { id: decodedtoken.id} ,})
     // res.locals.user = user;
     
      console.log(user.dataValues);
      res.status(201).json({message: user.dataValues});
      // req.user = validToken;
    
    });
    

    //next();
    // if (validToken) {
      
    //   return next();
    // }
  } catch (err) {
     res.status(400).json({ error: err });
  }
});

// router.get('/', async  (req, res) => { // Finds one User by its ID value and 
//   try {
//    // user = req.user.id
//   //  var userId = req.user.user_id;
//    console.log(userId)
//     const d = await User.findOne({where: { id: userId} ,
      
//     })
//     console.log(d.dataValues);
//     if (!d) {
//       res.status(404).json({message: 'Could not find a user with that ID!'});
//     } else {
//       res.status(200).json({message: d});
//     }
//   } catch (error) {
//     res.status(500).json(error);
//     console.log(error)
//   }
// });

router.put('/:id', async (req, res) => { // Updates a user by its `id` value
    try {
        const { phone, fullname,password } = req.body;
      
        bcrypt.hash(password, 10).then((hash) => {
            User.update({
             fullname: fullname,
             phone: phone,
             password: hash,
           }, {
            where: {
              id: req.params.id
            }
          })
             .then(() => {
               return res.status(201).json("done");
               //return res.redirect(201,"/login");
               //   console.log(user);
             })
             .catch((err) => {
               if (err) {
                 return res.status(404).json({
                   errors : err
                 })
                 
               }
             });
         })
          
        
    //   if (err) {
    //     res.status(404).json({message: 'Could not find a user with that ID!'});
    //     console.log(err)
    // }

    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  });
  


  module.exports = router;