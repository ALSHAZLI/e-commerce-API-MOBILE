const router = require('express').Router();
const { Order, User } = require('../../models');
const adminChecker = require("../controllers/adminController")
const { createTokens, validateToken } = require("../../JWT");
const { sign, verify } = require("jsonwebtoken");
const { orderSchma } = require("../helper/authSchema")

router.post('/',async (req, res) => { 
     
    // request shulde loock like this 
  //   { 
  //     "user_id": "4",
  //     "products":[{
  //          "id":4, 
  //          "name":"iphone",
  //          "image":"http://image.com",
  //          "quantity":2,
  //          "price": 22.0
  //        },
  //        {
  //          "id":5,
  //          "name":"iphone22",
  //          "image":"http://22image.com",
  //          "quantity":3,
  //          "price": 42.0
  //        }
  //        ],
  //     "total_price" : 93.0,
  //     "location": "khartom city"
  //  }

  const accessToken = req.header("x-auth-token");
 // const {products, total_price, user_id,location } = req.body;
  if (!accessToken){
  
    return res.status(400).json({ error: "User not Authenticated!@@@@@" });
  }
  try {
    const result = await orderSchma.validateAsync(req.body)
     verify(accessToken, "jwtsecretplschange",async (err,decodedtoken)=>{
      if(err){
        console.log(err.message);
        next();
      }
      console.log(decodedtoken.id)
    //  let user  = await User.findOne({where:  { id: decodedtoken.id} ,})
     // res.locals.user = user;
     const p = await Order.create({
      user_id: decodedtoken.id,
      location: result.location,
      total_price: result.total_price,
      products : result.products

     });
     res.status(200).json(p);

    });
  } catch (err) {
    if (err.isJoi === true) {
      const joiErr = err.details[0].message;
      console.log(joiErr)
      return res.status(422).json({
        joiErr
      })
     
    }
     res.status(400).json({ error: err });
     //console.log(err)
  }


});


router.get('/',validateToken, async (req,res) =>{
    Order.findAll({
      })
    .then(data => {
      res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while  HDJSDJSSucc ess retrieving tutorials."
        });
      });
});



router.get('/userOrders',async (req, res) => { // Finds a ALL Orders for one User by its ID and 

  const accessToken = req.header("x-auth-token");
  const {products, total_price, user_id,location } = req.body;
  if (!accessToken){
  
    return res.status(400).json({ error: "User not Authenticated!@@@@@" });

}
     verify(accessToken, "jwtsecretplschange",async (err,decodedtoken)=>{
      if(err){
        console.log(err.message);
        next();
      }
  try {
    const d = await Order.findAll({
      where: {
        user_id: decodedtoken.id
      },
      // include: [
      //   {
      //     model: User,
      //     attributes: ['id']
      //   },

      // ]
    })
    if (!d) {
      res.status(404).json({message: "Couldn't find that Order ID!"});
    } else {
      res.status(200).json(d);
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error)
  }
})
});

router.get('/:id',validateToken, async (req, res) => { // Finds a single Order by its ID and includes associated User and tag data
  try {
    const d = await Order.findOne({
      where: {
        id: req.params.id
      },
      // include: [
      //   {
      //     model: User,
      //     attributes: ['id']
      //   },

      // ]
    })
    if (!d) {
      res.status(404).json({message: "Couldn't find that product ID!"});
    } else {
      res.status(200).json(d);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.patch('/:id',(req, res) => { // Updates Order data
  Order.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      res.status(200).json(product);
    
    })  
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete('/:id', validateToken,async (req, res) => { // delete one Order by its `id` value
  try {
    const d = await Order.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!d) {
      res.status(404).json({message: 'Could not find a Order with that ID!'});
    } else {
      res.status(200).json("Done Order Deleted !!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
  
});


 module.exports = router;

