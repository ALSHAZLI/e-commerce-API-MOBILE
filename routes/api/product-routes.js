const router = require('express').Router();
const { Product, Category, } = require('../../models');
const adminChecker = require("../controllers/adminController")
const { productSchma } = require("../helper/authSchema")
// The `/api/products` endpoint

router.get('/', async (req, res) => { // Finds all products and includes associated category and tag data
  try {
    const d = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ['category_name']
        },
      ]
    })
    res.status(200).json(d);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => { // Finds a single product by its ID and includes associated category and tag data
  try {
    const d = await Product.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Category,
          attributes: ['category_name']
        },

      ]
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

router.post('/',adminChecker, async(req, res) => {
  
  try {
    const result = await productSchma.validateAsync(req.body)
    const p = await Product.create(result);
    res.status(200).json(p);
  } catch (err) {
    if (err.isJoi === true) {
      const joiErr = err.details[0].message;
      console.log(joiErr)
      return res.status(422).json({
        joiErr
      })
     
    }
    res.status(500).json(err);
  }
});

router.patch('/:id',adminChecker, (req, res) => { // Updates product data
  Product.update(req.body, {
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

router.delete('/:id', adminChecker,async (req, res) => { // delete one product by its `id` value
  try {
    const d = await Product.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!d) {
      res.status(404).json({message: 'Could not find a product with that ID!'});
    } else {
      res.status(200).json("Done product deleted");
    }
  } catch (error) {
    res.status(500).json(error);
  }
  
});

module.exports = router;
