const jwt = require("jsonwebtoken");

module.exports = function (req,res,next) {
    const token = req.header('x-auth-token')
    if(!token){
        return res.status(401).json({ error: "User HAVE  no TOKEN" });
    }
    try {
        const decodeToken = jwt.verify(token,'privekey');
        req.user = decodeToken;
        next();
    } catch (e) {
        res.status(400).json({ error: "User WRONGE %%%%%%  TOKEN" });
    }
}
//   const accessToken = sign(
//     { phone: user.phone, id: user.id }, 
//     "jwtsecretplschange",
//     { expiresIn: '36d' // expires in 36 days
//   }
//   );
    
//   return accessToken;


// const validateToken = (req, res, next) => {
//   // const accessToken = req.cookies["access-token"];
//    const accessToken = req.cookies["access-token"];

//   if (!accessToken)
//     return res.status(400).json({ error: "User not Authenticated!" });

//   try {
//     const validToken = verify(accessToken, "jwtsecretplschange");
//     if (validToken) {
//       req.authenticated = true;
//       return next();
//     }
//   } catch (err) {
//     return res.status(400).json({ error: err });
//   }
// };

// module.exports = { createTokens, validateToken };
// 