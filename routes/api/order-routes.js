const router = require('express').Router();
const { Order, Product, User } = require('../../models');


router.post('/', async (req, res) => { 
     
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
	try {

		const p = await Order.create(req.body);
		res.status(200).json(p);
	  } catch (error) {
		res.status(500).json(error);
	  }

});
// mobiles.forEach(mobile => {
//   for (let key in mobile) {
//       console.log(`${key}: ${mobile[key]}`);
//   }
// });

router.get('/', async (req,res) =>{
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


router.get('/:id', async (req, res) => { // Finds a single Order by its ID and includes associated category and tag data
  try {
    const d = await Order.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: User,
          attributes: ['user_id']
        },

      ]
    })
    if (!d) {
      res.status(404).json({message: "Couldn't find that Order ID!"});
    } else {
      res.status(200).json(d);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

 module.exports = router;
