const { sign, verify } = require("jsonwebtoken");
const User = require("../models/User");


const validateAdminToken =async (req, res, next) => {
const accessToken = req.header("x-auth-token");

if (!accessToken)

  return res.status(400).json({ error: "User not Authenticated!@@@@@" });

try {
  const validToken = verify(accessToken, "jwtsecretplschange",async (err,decodedtoken)=>{
    if(err){
      console.log(err.message);
      next();
    }
    console.log(decodedtoken.id)
    let user  = await User.findOne({where: { id: decodedtoken.id} ,})
   // res.locals.user = user;
    console.log(user.dataValues);
    let admin = user.dataValues.is_admin;
    if (admin === 1){
    
    next()
    // req.user = validToken;
    }else{
        res.json('you are not admin');
        next()
    }
    
  });
  

  //next();
  // if (validToken) {
    
  //   return next();
  // }
} catch (err) {
   res.status(400).json({ error: err });
}
}



module.exports = { validateAdminToken };


// const { sign, verify } = require("jsonwebtoken");

// const createAdminTokens = (user) => {
//   const accessToken = sign(
//     { phone: user.phone, id: user.id ,is_admin: user.is_admin}, 
//     "jwtsecretplschangeadmin",
//     { expiresIn: '36d' // expires in 36 days
//   }
//   );
    
//   return accessToken;
// };

// const validateAdminToken = (req, res, next) => {
//   // const accessToken = req.cookies["access-token"];
//    const accessToken = req.header("x-auth-token");

//   if (!accessToken)
//     return res.status(400).json({ error: "ACCESS DENEED Y NOT ADMIN!" });

//   try {
//     const validToken = verify(accessToken, "jwtsecretplschangeadmin");
//     if (validToken) {
//       req.authenticated = true;
//       return next();
//     }
//   } catch (err) {
//     return res.status(400).json({ error: err });
//   }
// };

// module.exports = { createAdminTokens, validateAdminToken };
