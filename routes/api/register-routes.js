const router = require('express').Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");

// The `/api/register` endpoint

router.get('/', async (req, res) => { // Finds all register Users
  try {
    const d = await User.findAll({
    })
    res.status(200).json(d);
  } catch (error) {
    res.status(500).json(error);
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


router.post('/', async (req, res) => { // Creates a new User
  const { phone, fullname,password } = req.body;
  const emailExists = await User.findOne({ where: { phone: phone } });
  if (emailExists ) {
    res.status(404).json("Phone already registered")
  }else{
  
  bcrypt.hash(password, 10).then((hash) => {
   const user = User.create({
    fullname: fullname,
    phone: phone,
    password: hash,
  })
    .then(() => {
      
      return res.status(201).json("Register Success !!! ");
      // return res.status(201).json("Register Success !!! ")
      //return res.redirect(201,"/login");
        console.log(user);
    })
    .catch((err) => {
      if (err) {
        return res.status(404).json({
          errors : err
        })
        
      }
    });
    
});
  }
  // try {
  //   const d = await User.create(req.body);
  //   res.status(200).json(d);
  // } catch (error) {
  //   res.status(500).json(error);
  //   console.log(error);
  // }
});

router.put('/:id', async (req, res) => { // Updates a user by its `id` value
  try {
    const d = await User.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (!d[0]) {
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
