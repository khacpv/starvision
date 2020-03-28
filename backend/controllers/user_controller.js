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
        as: 'Dttc'
      }
    ]
  })

  if (user){
    res.send({
      status: "success",
      data:[
          {
            Id_Dttc: user.ID_DTTC,
            Id_bacsi: user.MABS,
            Ten_DTTC: user.Dttc.TENDTTC,
            Tenbacsi: user.TENKHACHHANG,
            Mabacsi: user.MABS,
            Diachi: user.DIACHI,
            Sodienthoai: user.DIDONG
          }
      ]
    })
  }
  res.send({
    status: "error",
    data: ''
  })
});

module.exports = router;
