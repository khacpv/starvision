const express = require("express");
const router = express.Router();
const models = require("../models/index");
const Notifications = models.Notifications;
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  let result = await Notifications.findAll({
    attributes: ["id", "title", "content", "send_at", "is_read"],
  });
  if (result) {
    return res.send({
      status: "success",
      message: "",
      total: total,
      unread: count,
      data: result,
    });
  }
  return res.send({
    status: "error",
    message: "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
    data: "",
  });
});

router.get("/count_unread", async (req, res) => {
  let result = await Notifications.count({
    where: {
      is_read: 0,
    },
  });
  if (result) {
    return res.send({
      status: "success",
      message: "",
      data: result,
    });
  }
  return res.send({
    status: "error",
    message: "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
    data: "",
  });
});

router.post("/read", async (req, res) => {
  let result = await Notifications.update(
    {
      is_read: 1,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  );
  if (result) {
    return res.send({
      status: "success",
      message: "",
      data: "",
    });
  }
  return res.send({
    status: "error",
    message: "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
    data: "",
  });
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

  let result = await Notifications.create({
    title: req.body.title,
    content: req.body.content,
    sender_id: req.user.id,
    receiver_id: req.body.receiver_id,
    send_at: new Date(),
  });
  if (result) {
    return res.send({
      status: "success",
      message: "",
      data: "",
    });
  }
  return res.send({
    status: "error",
    message: "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
    data: "",
  });
});

module.exports = router;
