const express = require("express");
const router = express.Router();
const models = require("../models/index");
const Notifications = models.Notifications;
const { check, validationResult } = require("express-validator");
const sequelize = require("../config/db").sequelize;

router.get("/", async (req, res) => {
  let result = await Notifications.findAll({
    attributes: ["id", "title", "content", "send_at", "is_read"],
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
  let customerList = req.body.receiver_id.split(",");

  try {
    // get transaction
    transaction = await sequelize.transaction();
    customerList.forEach(async (customerId) => {
      let result = await Notifications.create({
        title: req.body.title,
        content: req.body.content,
        sender_id: req.user.id,
        receiver_id: customerId,
        send_at: new Date(),
      });
    });
    await transaction.commit();
    return res.send({
      status: "success",
      message: "",
      data: "",
    });

    // commit
  } catch (err) {
    // Rollback transaction only if the transaction object is defined
    if (transaction) await transaction.rollback();

    return res.send({
      status: "error",
      message: "Có lỗi xảy ra. Vui lòng liên hệ với chúng tôi để được hỗ trợ!",
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
