const router = require('express').Router();
const { Product, Category, } = require('../../models');
const adminChecker = require("../controllers/adminController")
const { productSchma } = require("../helper/authSchema")
const multer = require('multer')
const path = require('path')
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
    console.log(error)
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

router.post('/', async(req, res) => {
  let info = {
    image: `Images\\` + req.file.filename,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category_id: req.body.category_id
}
   
  try {
  //  const result = await productSchma.validateAsync( req.body)
    const p = await Product.create(info);
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
router.patch('/:id',(req, res) => { // Updates Order data

  try {
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
    Product.update(info, {
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
// router.patch('/:id', async(req, res) => { // Updates product data
// //   let info = {
// //     image: `Images\\` + req.file.filename,
// //     name: req.body.name,
// //     price: req.body.price,
// //     description: req.body.description,
// //     category_id: req.body.category_id
// // }
// // let inf = {

// //   name: req.body.name,
// //   price: req.body.price,
// //   description: req.body.description,
// //   category_id: req.body.category_id
// // }
// try {
//     // const result = await productSchma.validateAsync(req.body);
//     if(req.body){
//   const product = await Product.update({
   
//     name: req.body.name ,
//     price: req.body.price,
//     description: req.body.description,
//     category_id: req.body.category_id
//      } ,{
//     where: {
//       id: req.params.id
//     } 
//   })
//   res.status(200).json(product);
// }

// res.status(404).json("NO request body");
//   // if(!p){
//   //   const d = await Category.update(inf, {
//   //     where: {
//   //       id: req.params.id
//   //     } 
//   //   })
//   //   res.status(200).json(d);
//   // }
//   //if(p){

    
//   //}
 
//   } catch (err) {
//     // const result = await productSchma.validateAsync(req.body);
//     if(err){
//     //  const result = await productSchma.validateAsync(req.body);
    
//     const product = await Product.update({
//       image: `Images\\` + req.file.filename ,
//       name: req.body.name,
//       price: req.body.price, 
//       description: req.body.description,
//       category_id: req.body.category_id
//        } ,{
//       where: {
//         id: req.params.id 
//       } 
//     })
//     res.status(200).json(product);
 
//   }
// }
// console.log(err)
// res.status(500).json();

// });

router.delete('/:id',async (req, res) => { // delete one product by its `id` value
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

// 8. Upload Image Controller

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, 'Images')
//   },
//   filename: (req, file, cb) => {
//       cb(null, Date.now() + path.extname(file.originalname))
//   }
// })

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: '1000000' },
//   fileFilter: (req, file, cb) => {
//       const fileTypes = /jpeg|jpg|png|gif/
//       const mimeType = fileTypes.test(file.mimetype)  
//       const extname = fileTypes.test(path.extname(file.originalname))

//       if(mimeType && extname) {
//           return cb(null, true)
//       }
//       cb('Give proper files formate to upload')
//   }
// }).single('image')


module.exports = router;
