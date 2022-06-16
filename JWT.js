const { decode } = require("jsonwebtoken");
const { sign, verify } = require("jsonwebtoken");
const User = require("./models/User");

const createTokens = (user) => {
  const accessToken = sign(
    { phone: user.phone, id: user.id ,is_admin: user.is_admin}, 
    "jwtsecretplschange",
    { expiresIn: '36d' // expires in 36 days
  }
  );
    
  return accessToken;
};

const validateToken =async (req, res, next) => {
  // const accessToken = req.cookies["access-token"];
    const accessToken = req.header("x-auth-token");

  if (!accessToken)
  
    return res.status(400).json({ error: "User not Authenticated!******" });

  try {
    const validToken = verify(accessToken, "jwtsecretplschange",async (err,decodedtoken)=>{
      if(err){
        console.log(err.message);
        next();
      }
      console.log(decodedtoken.id)
     // let user  = await User.findOne({where: { id: decodedtoken.id} ,})
      // res.locals.user = user;
      //console.log(user.dataValues);
      // req.user = validToken;
       //return next();
    });
    

    next();
    // if (validToken) {
      
    //   return next();
    // }
  } catch (err) {
     res.status(400).json({ error: err });
  }
};

module.exports = { createTokens, validateToken };
