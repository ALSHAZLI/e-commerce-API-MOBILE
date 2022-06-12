const router = require('express').Router();
const { Category, Product } = require('../../models');
const { createTokens, validateToken } = require("../../JWT");
const { sign, verify } = require("jsonwebtoken");
const User = require("../../models/User");
const adminChecker = require("../controllers/adminController")
const  { createAdminTokens, validateAdminToken } = require("../../midellwaer/admin");
// The `/api/categories` endpoint

router.get('/',async (req, res) => { // Finds all categories and related associations
  //  http://localhost:3001/api/categories 
  try {
    const d = await Category.findAll({
      include: [{model: Product}]
    })
      // d.forEach(o => console.log(o.category_name));
    // res.status(200).json(d[0].dataValues);
     res.status(200).json(d);
   
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/shirts', async (req, res) => { // Finds ONE category and related associations
  //  http://localhost:3001/api/categories/shirts 
  try {
    const d = await Category.findOne({ where: { category_name: "shirts"} ,
      include: [{model: Product}]
    })
      // d.forEach(o => console.log(o.category_name));
    // res.status(200).json(d[0].dataValues);
     res.status(200).json(d);
   
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async  (req, res) => { // Finds one category by its ID value and related associations
  try {
    const d = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    if (!d) {
      res.status(404).json({message: 'Could not find a category with that ID!'});
    } else {
      res.status(200).json(d);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//validateAdminToken
router.post('/',adminChecker, async (req, res) => { // Creates a new category

 
      try {
        const d = await Category.create(req.body);
        res.status(200).json(d);
      } catch (error) {
        res.status(500).json(error);
      }
   // next()
   

  
});
//validateAdminToken
router.put('/:id',adminChecker, async (req, res) => { // Updates a category by its `id` value

  

  try {
    const d = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (!d) {
      res.status(404).json({message: 'Could not find a category with that ID!'});
    } else {
      console.log(d)
      res.status(201).json(d);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//validateAdminToken
router.delete('/:id',adminChecker, async (req, res) => { // Deletes a category by its `id` value
  try {
    const d = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!d) {
      res.status(404).json({message: 'Could not find a category with that ID!'});
    } else {
      res.status(200).json(d);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});



module.exports = router;
