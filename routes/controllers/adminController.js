const { sign, verify } = require("jsonwebtoken");
const User = require("../../models/User");

let adminChecker = async(req,res,next) =>{
    const accessToken = req.header("x-auth-token");
  
    if (!accessToken){
    
      return res.status(400).json({ error: "User not Authenticated!@@@@@" });
    }
      const validToken = verify(accessToken, "jwtsecretplschange",async (err,decodedtoken)=>{
        if(err){
          console.log(err.message);
         // next();
        }
        console.log(decodedtoken.id)
        let user  = await User.findOne({where: { id: decodedtoken.id} ,})
       // res.locals.user = user;
        console.log(user.dataValues); 
        let admin = user.dataValues.is_admin;
        if (admin === 1){
         
       next()
        
        }else{
            res.json('you are not admin');
         //   next()
        }
    
      })
  }

  module.exports = adminChecker;