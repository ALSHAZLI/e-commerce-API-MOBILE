const router = require('express').Router();



router.get('/', (req,res)=>{
    res.status(201).json("log OUT PAGE @@@!!!!!!!!!!!!");
});
router.post('/', (req,res)=>{
    res.status(201).json("log OUT PAGE DONE #######3");
});




module.exports = router;