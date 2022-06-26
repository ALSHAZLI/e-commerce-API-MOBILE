const router = require('express').Router();



router.get('/', (req,res)=>{
    try{
    req.header("x-auth-token",'');
    res.status(201).json("log OUT PAGE @@@!!!!!!!!!!!!");
    }catch{
        res.status(400).json("log OUT FIELD **************");  
    }
});
// router.post('/', (req,res)=>{
//     res.status(201).json("log OUT PAGE DONE #######3");
// });


 

module.exports = router;