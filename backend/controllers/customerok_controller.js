const express = require("express");
const router = express.Router();
const models = require("../models/index");
const CustomerOk = models.CustomerOk;

router.get("/", (req, res) => {
  CustomerOk.findAll({})
    .then(data => {
      res.send({ code: 200, msg: "success", items: data });
    })
    .catch(err => res.json(err));
});

router.post("/", (req, res) => {
    CustomerOk.create({
        name: req.body.name
    })
    .then(data => {
        res.send({ code: 200, msg: "success", items: data });
    })
    .catch(err => res.json(err));
});

router.put("/:id", (req, res) => {
  CustomerOk.update({ name: req.body.name }, { where: { id: req.params.id } })
    .then(data => {
      res.send({ code: 200, msg: "success", items: data });
    })
    .catch(err => res.json(err));
});

router.delete("/:id", (req, res) => {
  CustomerOk.destroy({
    where: { id: req.params.id }
  })
    .then(data => {
      res.send({ code: 200, msg: "success"});
    })
    .catch(err => res.json(err));
});

module.exports = router;
