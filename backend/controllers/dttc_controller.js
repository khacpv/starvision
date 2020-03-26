const express = require("express");
const router = express.Router();
const models = require("../models/index");
const DTTC = models.DTTC;

router.get("/", (req, res) => {
  DTTC.findAll({})
    .then(data => {
      res.send({ code: 200, msg: "success", items: data });
    })
    .catch(err => res.json(err));
});

router.get("/:id", (req, res) => {
    DTTC.findByPk(req.params.id)
    .then(data => {
      res.send({ code: 200, msg: "success", items: data });
    })
    .catch(err => res.json(err));
});

router.post("/", (req, res) => {
    DTTC.create({
        name: req.body.name
    })
    .then(data => {
        res.send({ code: 200, msg: "success", items: data });
    })
    .catch(err => res.json(err));
});

router.put("/:id", (req, res) => {
  DTTC.update({ name: req.body.name }, { where: { id: req.params.id } })
    .then(data => {
      res.send({ code: 200, msg: "success", items: data });
    })
    .catch(err => res.json(err));
});

router.delete("/:id", (req, res) => {
  DTTC.destroy({
    where: { id: req.params.id }
  })
    .then(data => {
      res.send({ code: 200, msg: "success"});
    })
    .catch(err => res.json(err));
});

module.exports = router;
