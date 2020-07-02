const express = require("express");
const router = express.Router();
const models = require("../../models/index");
const LensePrice = models.LensePrice;
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  let result = await LensePrice.findOne({
    limit: 1,
    order: [["createdAt", "DESC"]],
    attributes: {
      exclude: ["id", "createdAt", "updatedAt", "status"],
    },
  });
  if (result) {
    return res.send({ code: 200, msg: "success", data: result });
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

  let result = await LensePrice.create({
    price: req.body.price,
  });
  if (result) {
    return res.send({ code: 200, msg: "success" });
  }
  return res.send({ code: 400, msg: "error" });
});

module.exports = router;
