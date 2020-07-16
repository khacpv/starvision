const express = require("express");
const router = express.Router();
const models = require("../models/index");
const Doctors = models.Doctors;
const Users = models.Users;
const { check, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const sequelize = require("../config/db").sequelize;
const Sequelize = require("sequelize");
const { Op } = Sequelize;

router.get("/search", async (req, res) => {
  let doctorName = req.query.doctor_name;
  
  let result = await Doctors.findAll({
    where:{
      [Op.or]: [
        {
          name: {
            [Op.like]: `%${doctorName}%`,
          },
        },{
          department_name: {
            [Op.like]: `%${doctorName}%`,
          },
        }
      ]
    }
  });
  if (result) {
    return res.send({ code: 200, msg: "success", items: result });
  }
  return res.send({ code: 400, msg: "error" });
});

router.get("/", async (req, res) => {
  let result = await Doctors.findAll({
    attributes: {
      exclude: ['password']
    }
  });
  if (result) {
    return res.send({ code: 200, msg: "success", items: result });
  }
  return res.send({ code: 400, msg: "error" });
});

router.get("/:id", async (req, res) => {
  let result = await Doctors.findByPk(req.params.id);
  if (result) {
    return res.send({ code: 200, msg: "success", items: result });
  }
  return res.send({ code: 400, msg: "error" });
});

router.post("/", async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({
      status: "error",
      message: errors.array()[0].msg,
      data: "",
    });
  }
  try {
    // get transaction
    transaction = await sequelize.transaction();
    let hash = bcrypt.hashSync(req.body.password, salt);
    user = await Users.create({
      username: req.body.username,
      password: hash,
      user_nicename: req.body.username,
      display_name: req.body.username,
      role: "doctor",
    });
    if (user) {
      let countDoctor = await Doctors.max('code');
      countDoctor = Number(countDoctor.split('KH')[1])+1;
      let doctorCode = 0 + ".KH" + countDoctor;
      let result = await Doctors.create({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        birthday: req.body.birthday,
        code: doctorCode,
        user_id: user.id,
        department_name: req.body.department_name,
        address: req.body.address,
        dttc_id: req.body.dttc_id,
        doctor_id: req.body.doctor_id,
        dttc_name: req.body.dttc_name,
        phone: req.body.phone,
        username: req.body.username,
        password: req.body.password,
        contract_code: req.body.contract_code,
        note: req.body.note,
        email: req.body.email,
      });
      if (result) {
        return res.send({ code: 200, msg: "success", items: result });
      }
    }
    await transaction.commit();
  } catch (err) {
    // Rollback transaction only if the transaction object is defined
    if (transaction) await transaction.rollback();

    return res.send({
      status: "error",
      message: "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
      data: "",
    });
  }

  return res.send({ code: 400, msg: "error" });
});

router.put("/:id", async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({
      status: "error",
      message: errors.array()[0].msg,
      data: "",
    });
  }
  let result = await Doctors.update(
    {
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      birthday: req.body.birthday,
      doctor_name: req.body.doctor_name,
      address: req.body.address,
      dttc_id: req.body.dttc_id,
      doctor_id: req.body.doctor_id,
      dttc_name: req.body.dttc_name,
      phone: req.body.phone,
      username: req.body.username,
      contract_code: req.body.contract_code,
      note: req.body.note,
      email: req.body.email,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  if (result) {
    return res.send({ code: 200, msg: "success"});
  }

  return res.send({ code: 200, msg: "error" });
});

router.delete("/:id", async (req, res) => {
  let result = await Doctors.destroy({
    where: { id: req.params.id },
  });
  if (result) {
    return res.send({ code: 200, msg: "success" });
  }
  return res.send({ code: 400, msg: "error" });
});

module.exports = router;
