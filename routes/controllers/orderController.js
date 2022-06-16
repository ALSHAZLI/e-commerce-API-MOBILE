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
      console.log(decodedtoken)
      //return decodedtoken;
      next();
      })
}

module.exports = orderCheker;