const router = require('express').Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");



router.get('/', async (req, res) => {
    return res.send("profile sure : You Are Loged In");
});

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