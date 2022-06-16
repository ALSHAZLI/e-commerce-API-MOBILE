
const router = require('express').Router();







router.get('/',(req, res)=> {
  
    res.send('welcome to the home demo. refresh!');
  
})
//   router.get('/' ,(req, res) => {
//     return res.send("Home Page &^&^&^**$$");
// });
 
module.exports = router;