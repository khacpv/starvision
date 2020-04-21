const express = require("express");
const router = express.Router();
const models = require("../models/index");
const Dttc = models.Dttc;

router.get("/", (req, res) => {
  Dttc.findAll({})
    .then(data => {
      res.send({ code: 200, msg: "success", items: data });
    })
    .catch(err => res.json(err));
});

router.get("/:id", (req, res) => {
    Dttc.findByPk(req.params.id)
    .then(data => {
      res.send({ code: 200, msg: "success", items: data });
    })
    .catch(err => res.json(err));
});

router.post("/", (req, res) => {
    Dttc.create({
        name: req.body.name
    })
    .then(data => {
        res.send({ code: 200, msg: "success", items: data });
    })
    .catch(err => res.json(err));
});

router.put("/:id", (req, res) => {
  Dttc.update({ name: req.body.name }, { where: { id: req.params.id } })
    .then(data => {
      res.send({ code: 200, msg: "success", items: data });
    })
    .catch(err => res.json(err));
});

router.delete("/:id", (req, res) => {
  Dttc.destroy({
    where: { id: req.params.id }
  })
    .then(data => {
      res.send({ code: 200, msg: "success"});
    })
    .catch(err => res.json(err));
});

module.exports = router;
