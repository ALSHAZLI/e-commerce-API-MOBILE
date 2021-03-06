const router = require('express').Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createTokens, validateToken } = require("../../JWT");
const { registerSchma } = require("../helper/authSchema")
var db = require('../../config/connection'); 

    sequelize = db.sequelize,
    Sequelize = db.Sequelize;
// The `/api/register` endpoint

router.get('/', async (req, res) => { // Finds all register Users
  try {
    const d = await User.findAll({
      
    })
    res.status(200).json(d);
  } catch (error) {
    res.status(500).json(error);
    console.log(error)
  }
});

router.get('/date', async (req, res) => {
      try {
         sequelize.query(
       // 'SELECT date_format(created_at,"%M") month,group_concat(id ORDER BY id)  ids FROM ecommerce_db.user GROUP BY month;'
        'SELECT date(created_at) month,group_concat(id ORDER BY id)  ids FROM ecommerce_db.user GROUP BY month;'
          
 // 'select id , min(created_at) as min_date from ecommerce_db.user group by id'
           )
         .then((dt) => {
          //  const allData = data.lingth
            
            const data = dt[0]
            const dataAll = data[0]
           // console.log(dataAll.month.charAt(6))
           let sum = dataAll.month.substring(5, 7)
            console.log(03 - 0)
            
            //const data = dataAll[0] .substring(1, 4)
          //  const the = dataAll[1].ids
        //  const sucsess = dataA.min_date
          const suc = dataAll.ids.split(',').length
         // const newSuc = suc.length
          console.log(suc)
        //  console.log(newSuc)

          //  var t =  the.split(',').length  charAt
          //   console.log(t)
          
          return res.status(201).json(data);
      }).catch((err)=>{
        console.log(err)
      })
       
      } catch (err) {
          console.log(err);
      }
  });


router.post('/', async (req, res,next) => { // Creates a new User
  try{
    
  //const { phone, fullname,password } = req.body;
  const result = await registerSchma.validateAsync(req.body)
  // const er =  authSchma.validate({});
  // console.log(er)
  const phoneExists = await User.findOne({ where: { phone: result.phone } });
  const fullnameExists = await User.findOne({ where: { fullname: result.fullname } });

  if(!req.body){
    res.status(404).json("Phone and fyllname and password requierd !!")
  }
  if (phoneExists ) {
    res.status(404).json("Phone already registered")
  }
  if (fullnameExists ) {
    res.status(404).json("fullnameExists already registered")
  }else{
  
  bcrypt.hash(result.password, 10).then((hash) => {
   User.create({
    fullname: result.fullname,
    phone: result.phone,
    password: hash,
  })
    .then((user) => {
      
       const accessToken = createTokens(user);
    
      //     res.cookie("access-token", accessToken, {
      //       maxAge: 60 * 60 * 24 * 30 * 1000,
      //       httpOnly: true,
      //     });
      // const token = jwt.sign(
      //   {user_id: user.id,  phone },
      //   "skldlskdlksd",
      //   {
      //     expiresIn: "2h",
      //   }
      // );
      // save user token
      //  user.accessToken = accessToken;
     // const token =  accessToken;
      console.log(user.dataValues)
      // const userInfo  = user.dataValues
      return res.status(201).json({user});
      // return res.status(201).json("Register Success !!! ")
      //return res.redirect(201,"/login");
        console.log(user);
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
  if (err.isJoi === true) {
    const joiErr = err.details[0].message;
    console.log(joiErr)
    return res.status(422).json({
      joiErr
    })
   
  }
  return res.status(400).json({ error: err });
}  
});

router.get('/:id', async  (req, res) => { // Finds one User by its ID value and 
  try {
    const d = await User.findByPk(req.params.id, {
      
    })
    if (!d) {
      res.status(404).json({message: 'Could not find a user with that ID!'});
    } else {
      res.status(200).json(d);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});




router.put('/:id', async (req, res) => { // Updates a user by its `id` value
  try {
    const d = await User.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (!d) {
      res.status(404).json({message: 'Could not find a user with that ID!'});
    } else {
      res.status(200).json(d);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => { // Deletes a user by its `id` value
  try {
    const d = await User.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!d) {
      res.status(404).json({message: 'Could not find a User with that ID!'});
    } else {
      res.status(200).json(d);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;





// router.post('/', async (req, res) => { // Creates a new User
//   const { phone, fullname,password } = req.body;
//   const emailExists = await User.findOne({ where: { phone: phone } });
//   if (emailExists ) {
//     res.status(404).json("Phone already registered")
//   }else{
  
//   bcrypt.hash(password, 10).then((hash) => {
//    const user = User.create({
//     fullname: fullname,
//     phone: phone,
//     password: hash,
//   })
//     .then(() => {
//       // const accessToken = createTokens(user);
    
//       //     res.cookie("access-token", accessToken, {
//       //       maxAge: 60 * 60 * 24 * 30 * 1000,
//       //       httpOnly: true,
//       //     });
//       const token = jwt.sign(
//         {user_id: user.id,  phone },
//         "skldlskdlksd",
//         {
//           expiresIn: "2h",
//         }
//       );
//       // save user token
//       user.token = token;
//       console.log(token)
//       return res.status(201).json(user);
//       // return res.status(201).json("Register Success !!! ")
//       //return res.redirect(201,"/login");
//         console.log(user);
//     })
//     .catch((err) => {
//       console.log(err);
//       if (err) {
//         return res.status(404).json({
//           errors : err
//         })
       
//       }
//     });
    
//     });
//   }

// });