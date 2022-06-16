const router = require("express").Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
var bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());
const { sign, verify } = require("jsonwebtoken");
const { updateProfileSchma } = require("../helper/authSchema")


//  http://localhost:3001/api/profile
//Method : GET   hear we get user info  in his profile by his Id and Id stored in Token accessToken
router.get("/", (req, res) => {
  const accessToken = req.header("x-auth-token");

  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!@@@@@" });

  try {
    const validToken = verify(
      accessToken,
      "jwtsecretplschange",
      async (err, decodedtoken) => {
        if (err) {
          console.log(err.message);
          next();
        }
        console.log(decodedtoken.id);
        let user = await User.findOne({ where: { id: decodedtoken.id } });
        // res.locals.user = user;

        console.log(user.dataValues);
        res.status(201).json({ userInfo: user.dataValues });
        // req.user = validToken;
      }
    );
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

//  http://localhost:3001/api/profile/user
//Method : Patch  Update user info in db

router.patch("/", async (req, res) => {
  // Updates a user by its `id` value
  const accessToken = req.header("x-auth-token");

  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!@@@@@" });
  try {
    //const { password } = req.body;
    const result = await updateProfileSchma.validateAsync(req.body)
    const validToken = verify(
      accessToken,
      "jwtsecretplschange",
      async (err, decodedtoken) => {
        if (err) {
          console.log(err.message);
          next();
        }
        if (result.password) {
          const hash = bcrypt.hashSync(req.body.password, 10);
          password = hash;

          //    bcrypt.hash(password, 10).then((hash) => {  password =  hash})
          User.update(
            {
              fullname: result.fullname,
              phone: result.phone,
              password: hash,
            },
            {
              where: {
                id: decodedtoken.id,
              },
            }
          )
            .then(() => {
              return res.status(201).json("done");
              //return res.redirect(201,"/login");
              //   console.log(user);
            })
            .catch((err) => {
              if (err) {
                return res.status(404).json({
                  errors: err,
                });
              }
            });
          //    })
        } else {
          User.update(
            {
              fullname: result.fullname,
              phone: result.phone,
            },
            {
              where: {
                id: decodedtoken.id,
              },
            }
          )
            .then(() => {
              return res.status(201).json("done");
              //return res.redirect(201,"/login");
              //   console.log(user);
            })
            .catch((err) => {
              if (err) {
                return res.status(404).json({
                  errors: err,
                });
              }
            });
        }
      }
    );
  } catch (err) {
    if (err.isJoi === true) {
      const joiErr = err.details[0].message;
      console.log(joiErr)
      return res.status(422).json({
        joiErr
      })  
     
    }
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
