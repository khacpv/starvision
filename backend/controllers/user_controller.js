const express = require("express");
const router = express.Router();
const models = require("../models/index");
const User = models.User;

router.get("/", (req, res) => {
  User.findAll({})
    .then(data => {
      res.send({ code: 200, msg: "success", items: data });
    })
    .catch(err => res.json(err));
});

router.get("/:id", (req, res) => {
    User.findByPk(req.params.id)
    .then(data => {
      res.send({ code: 200, msg: "success", items: data });
    })
    .catch(err => res.json(err));
});

router.post("/", (req, res) => {
    User.create({
        name: req.body.name
    })
    .then(data => {
        res.send({ code: 200, msg: "success", items: data });
    })
    .catch(err => res.json(err));
});

router.put("/:id", (req, res) => {
  User.update({ name: req.body.name }, { where: { id: req.params.id } })
    .then(data => {
      res.send({ code: 200, msg: "success", items: data });
    })
    .catch(err => res.json(err));
});

router.delete("/:id", (req, res) => {
  User.destroy({
    where: { id: req.params.id }
  })
    .then(data => {
      res.send({ code: 200, msg: "success"});
    })
    .catch(err => res.json(err));
});

module.exports = router;
