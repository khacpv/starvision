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
      msg: "Tài khoản hoặc mật khẩu không chính xác",
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
          role: user.role,
          user_email: user.user_email,
          user_nicename: user.user_nicename,
          user_id: user.id,
          user_display_name: user.display_name,
        },
      });
    } else {
      res.status(401).json({ msg: "Tài khoản hoặc mật khẩu không chính xác" });
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
        user_email: data.email,
        username: data.username,
        role: data.role,
        password: hash,
        display_name: data.user_display_name,
        user_nicename: data.user_nicename,
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
