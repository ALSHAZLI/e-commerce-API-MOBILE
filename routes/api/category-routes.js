const router = require('express').Router();
const { Category, Product } = require('../../models');
const { createTokens, validateToken } = require("../../JWT");
const { sign, verify } = require("jsonwebtoken");
const User = require("../../models/User");
const adminChecker = require("../controllers/adminController")
const  { createAdminTokens, validateAdminToken } = require("../../midellwaer/admin");
const { categorySchma } = require("../helper/authSchema")

// The `/api/categories` endpoint

router.get('/',validateToken,async (req, res) => { // Finds all categories and related associations
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

router.get('/shirts', async (req, res) => {   // Finds O NE category and related  associations
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

router.get('/:id',validateToken, async  (req, res) => { // Finds one category by its ID value and related associations
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
router.post('/',validateToken, async(req, res) => {

  let info = {
    image: `Images\\` + req.file.filename,
    category_name: req.body.category_name,
    
}
  
  try {
    
  //  const result = await productSchma.validateAsync( req.body)
    const p = await Category.create(info);
    res.status(200).json(p);
  } catch (err) {
    // if (err.isJoi === true) {
    //   const joiErr = err.details[0].message;
    //   console.log(joiErr)
    //   return res.status(422).json({
    //     joiErr
    //   })
     
    // } 
    res.status(500).json(err);
    console.log(err)
  }
});
//validateAdminToken


router.patch('/:id',(req, res) => { // Updates Order data

  try {
    Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then((category) => {
        res.status(200).json(category);
      
      })  
      .catch((err) => {
        res.status(400).json(err);
        console.log(err)
      });
  } catch (error) {
    console.log(error)
  }

});

router.patch('/img/:id',(req, res) => { // Updates Order data
  let info = {
    image: `Images\\` + req.file.filename,
}
  try {
    Category.update(info, {
      where: {
        id: req.params.id,
      }, 
    })
      .then((product) => {
        res.status(200).json(product);
      
      })  
      .catch((err) => {
        res.status(400).json(err);
        console.log(err)
      });
  } catch (error) {
    console.log(error)
  }

});


// router.patch('/:id', async (req, res) => { // Updates a category by its `id` value

// //   let info = {
// //     image: `Images\\` + req.file.filename,
// //     category_name: req.body.category_name,
// // }
// // let inf = {
// // category_name: req.body.category_name
// // }
// const {   image,
// category_name} = req.body
//   try {
    
//     const p = await Category.update({
//       image: `Images\\` + req.file.filename ,
//       category_name: req.body.category_name
//        } ,{
//       where: {
//         id: req.params.id
//       } 
//     })
  

//       res.status(200).json(p);
//     //}
   
//     } catch (err) {
//       const result = await categorySchma.validateAsync(req.body);
//       if(err){
//       const p = await Category.update({
       
//         category_name: result.category_name
//          } ,{
//         where: {
//           id: req.params.id 
//         } 
//       })
//       res.status(200).json(p);
   
//     }
//   }
//   if (err.isJoi === true) {
//     const joiErr = err.details[0].message;
//     console.log(joiErr)
//     return res.status(422).json({
//       joiErr
//     })
   
//   }
//   res.status(500).json(p);
//   console.log(err)
// });
//validateAdminToken
router.delete('/:id',validateToken, async (req, res) => { // Deletes a category by its `id` value
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
    console.log(error)
  }
});



module.exports = router;
