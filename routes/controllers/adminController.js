const { sign, verify } = require("jsonwebtoken");
const User = require("../../models/User");

let orderCheker = async (req,res,next)=>{
  const accessToken = req.header("x-auth-token");
  const {products, total_price, user_id,location } = req.body;
  if (!accessToken){
  
    return res.status(400).json({ error: "User not Authenticated!@@@@@" });

}
     verify(accessToken, "jwtsecretplschange",async (err,decodedtoken)=>{
      if(err){
        console.log(err.message);
        next();
      }
      //return decodedtoken;
      })
}

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
        //console.log(user.dataValues); 
        let admin = user.dataValues.is_admin;
        if (admin === 1){
         
       next()
        
        }else{
          return  res.json('you are not admin');
         //   next()
        }
    
      })
  }

  module.exports = adminChecker;;