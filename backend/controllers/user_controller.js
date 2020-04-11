const express = require("express");
const router = express.Router();
const models = require("../models/index");
const Customer = models.Customer;
const Dttc = models.Dttc;


router.get("/", async (req, res) => {
  let userId = req.query.id;

  let user = await Customer.findOne({
    where: { 
      id: userId
    },
    include: [
      {
        model: Dttc,
        as: 'dttc'
      }
    ]
  })

  if (user){
    return res.send({
      status: "success",
      data:[
          {
            Id_Dttc: user.dttc_id,
            Id_bacsi: user.doctor_id,
            Ten_DTTC: user.dttc ? user.dttc.name : null,
            Tenbacsi: user.customer_name,
            Mabacsi: user.doctor_code,
            Diachi: user.address,
            Sodienthoai: user.mobile
          }
      ]
    })
  }
  return res.send({
    status: "error",
    data: ''
  })
});

module.exports = router;
