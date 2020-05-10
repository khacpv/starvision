const express = require("express");
const router = express.Router();
const models = require("../models/index");
const User = models.Users;
const Token = models.Tokens;
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const { check, validationResult } = require("express-validator");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  let user = await User.findOne({
    where: {
      username: username,
    },
  });
  if (!user) {
    res.status(401).send({
      code: 401,
      msg: "Authentication failed. User not found.",
    });
  } else {
    if (bcrypt.compareSync(password, user.password)) {
      var token = jwt.sign(user.dataValues, config.app.secret);
      if (token) {
        let checkToken = await Token.findOne({
          where: {
            user_id: user.id,
          },
        });
        if (!checkToken) {
          Token.create({
            access_token: token,
            user_id: user.id,
          });
        } else {
          Token.update(
            {
              access_token: token,
              user_id: user.id,
            },
            {
              where: {
                user_id: user.id,
              },
            }
          );
        }
      }
      res.status(200).send({
        status: "success",
        message: "",
        data: {
          token: token,
          user_email: user.email,
          user_nicename: user.fullname,
          user_id: user.id,
          user_display_name: user.username,
        },
      });
    } else {
      res.status(401).json({ msg: "Password is incorrect" });
    }
  }
});

router.post(
  "/register",
  [
    check("username", "Username too short").isLength({ min: 5 }),
    // check("email", "Email wrong format").isEmail(),
    check("password", "Username too short").isLength({ min: 5 }),
    check("username", "Username is required").not().isEmpty(),
  ],
  async (req, res) => {
    let data = req.body;
    let hash = bcrypt.hashSync(req.body.password, salt);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        code: 400,
        msg: "Invalid data",
      });
    } else {
      let checkUser = await User.count({
        where: {
          username: data.username,
        },
      });
      
      if (checkUser > 0) {
        return res.status(200).send({
          code: 400,
          msg: "Account existed",
        });
      }

      let user = await User.create({
        email: data.email,
        username: data.username,
        password: hash,
        name: data.name,
        age: data.age,
        phone: data.phone,
        address: data.address,
        birthday: data.birthday,
        gender: data.gender,
        note: data.note,
        user_id:Number(checkUser)+1
      });

      if (user) {
        return res.send({
          code: 200,
          msg: "Register successfull",
          data: user,
        });
      } else {
        return res.status(400).send({
          code: 400,
          msg: "Register Error",
        });
      }
    }
  }
);

module.exports = router;
