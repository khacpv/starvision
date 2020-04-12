const express = require("express");
const router = express.Router();
const models = require("../models/index");
const Customer = models.Customer;
const CustomerOk = models.CustomerOk;
const Fitting = models.Fitting;
const OrderLense = models.OrderLense;
const Lense = models.Lense;
const { check, validationResult } = require("express-validator");
const Sequelize = require("sequelize");
const { Op } = Sequelize;

router.get('/',[

],async (req, res)=>{
    return res.send({
        data: "1"
    })
})

module.exports = router;
