const express = require("express");
const router = express.Router();
const models = require("../models/index");
const Customer = models.Customer;
const { check, validationResult } = require("express-validator");

router.get("/", (req, res) => {
  Customer.findAll({})
    .then(data => {
      res.send({ code: 200, msg: "success", items: data });
    })
    .catch(err => res.json(err));
});

router.get("/:id", (req, res) => {
  Customer.findByPk(req.params.id)
    .then(data => {
      res.send({ code: 200, msg: "success", items: data });
    })
    .catch(err => res.json(err));
});

router.post(
  "/",
  [
    check("iddttc", "IDDTTC không được bỏ trống.").not() .isEmpty(),
    check("birthday", "Ngày sinh không được bỏ trống.").not() .isEmpty()
  ],
  async (req, res) => {
    let data = req.body;
    let errors = validationResult(req);
    let count = await Customer.count({})+1;
    let makh = data.mabacsi+ ".KH"+count;
    if (!errors.isEmpty()) {
      return res.send({
        status: 'error',
        message: errors.array()[0].msg,
        data: '',
      });
    }else{
      let check_customer = await Customer.findOne({
        where:{
          TENKHACHHANG: data.tenkh,
          DIDONG: data.mobile,
          NGAYSINH: data.birthday
        }
      });
      if (check_customer){
        return res.send({
          status : 'error',
          message: 'Tên khách hàng đã tồn tại trong hệ thống.',
          data: ''
        })
      }
      let customer = await  Customer.create({
        MAKH: makh, 
        TENKHACHHANG: data.tenkh, 
        MABS: data.mabacsi, 
        TENBS: data.tenbacsi, 
        DIDONG: data.mobile, 
        DIACHI: data.diachi, 
        NGAYSINH: data.birthday, 
        GHICHUHOSOKHACHHANG:data.ghichu, 
        DULIEUNHOM: 1, 
        NGUOIQUANLY:data.tendttc,
        GIOITINH: data.gender, 
        ID_LOAIHOSOKH: 300, 
        ID_DTTC: data.iddttc, 
        NGAY1: new Date()
      });
      if (customer){
        return res.send({ 
          status: "success", 
          message: "",
          data: [
            {
              ID_KHACHHANG: customer.id,
              NAMSINH: customer.NAMSINH,
              TENKHACHHANG: customer.TENKHACHHANG,
              DIDONG: customer.DIDONG,
              GIOITINH: customer.GIOITINH,
              DIACHI: customer.DIACHI
            }
          ]
        });
      }
    }

   
      
  }
);

router.put("/:id", (req, res) => {
  Customer.update({ name: req.body.name }, { where: { id: req.params.id } })
    .then(data => {
      res.send({ code: 200, msg: "success", items: data });
    })
    .catch(err => res.json(err));
});

router.delete("/:id", (req, res) => {
  Customer.destroy({
    where: { id: req.params.id }
  })
    .then(data => {
      res.send({ code: 200, msg: "success" });
    })
    .catch(err => res.json(err));
});

module.exports = router;
