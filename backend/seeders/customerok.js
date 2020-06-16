const fs = require("fs");
var path = require("path");
var appDir = path.dirname(__filename);
const models = require("../models/index");
const { mainModule } = require("process");
const CustomerOk = models.CustomerOk;
const CustomerCheck = models.CustomerCheck;

function leftData() {
  try {
    let du_bao = fs.readFileSync(appDir + "/customerok.txt", "UTF-8");
    let du_bao_san_pham = fs.readFileSync(
      appDir + "/du_bao_san_pham.txt",
      "UTF-8"
    );
    let customerok_array = [];
    let fitting_type = [163, 164];
    let data_dubaos = du_bao.split(/\r?\n/);
    let data_du_bao_san_pham = du_bao_san_pham.split(/\r?\n/);

    data_dubaos.forEach((dubao, index) => {
      let spl = dubao.split("\t");
      spl.forEach((element, index) => {
        if (element == "NULL") {
          spl[index] = null;
        }
      });

      if (fitting_type.includes(Number(spl[9]))) {
        // fs.appendFileSync(appDir + "/customerok.txt", dubao + "\r\n");
        data_du_bao_san_pham.forEach((dubaosanpham, index) => {
          let spl_san_pham = dubaosanpham.split("\t");
          spl_san_pham.forEach((element, index) => {
            if (element == "NULL") {
              spl_san_pham[index] = null;
            }
          });
          if (spl[0] == spl_san_pham[1]) {
            let Customok_lense_od = spl_san_pham[2];
            if (Number(Customok_lense_od) == 1) {
              Customok_lense_od = "XMJ";
            } else if (Number(Customok_lense_od) == 2) {
              Customok_lense_od = "XM";
            } else if (Number(Customok_lense_od) == 3) {
              Customok_lense_od = "H";
            }
            if (Number(spl[9] == 163)) {
              console.log(spl[9]);
              
              CustomerOk.create({
                refactometer_sph: spl_san_pham[14],
                refactometer_cyl: spl_san_pham[15],
                refactometer_ax: spl_san_pham[16],
                bcva_va: spl_san_pham[43],
                bcva_sph: spl_san_pham[34],
                bcva_cyl: spl_san_pham[35],
                bcva_ax: spl_san_pham[36],
                original_k1: spl_san_pham[37],
                original_k2: spl_san_pham[38],
                original_ave: spl_san_pham[39],
                original_hvid: spl_san_pham[41],
                lense: Customok_lense_od,
                k_code: spl_san_pham[5],
                power: spl_san_pham[6],
                size: spl_san_pham[7],
                ngayfitting: spl[21],
                contract_code: spl[5],
              }).then(function (data) {
                CustomerCheck.findOne({
                  where: {
                    customer_id: spl[1],
                    dttc_id: spl[2],
                  },
                }).then(function (customercheck) {
                  if (customercheck) {
                    CustomerCheck.update(
                      {
                        id_right: data.id,
                      },
                      {
                        where: {
                          id: customercheck.id,
                        },
                      }
                    );
                  } else {
                    CustomerCheck.create({
                      id: spl[0],
                      doctor_code: null,
                      doctor_id: null,
                      customer_id: spl[1],
                      dttc_id: spl[2],
                      date_examination: spl[31],
                      contract_code: spl[5],
                      id_left: null,
                      id_right: data.id,
                      type: "GOV",
                    });
                  }
                });
              });
            }
          }
        });
      }
    });
  } catch (err) {
    console.error(err);
  }
}
function rightData() {
  try {
    let du_bao = fs.readFileSync(appDir + "/customerok.txt", "UTF-8");
    let du_bao_san_pham = fs.readFileSync(
      appDir + "/du_bao_san_pham.txt",
      "UTF-8"
    );
    let customerok_array = [];
    let fitting_type = [163, 164];
    let data_dubaos = du_bao.split(/\r?\n/);
    let data_du_bao_san_pham = du_bao_san_pham.split(/\r?\n/);

    data_dubaos.forEach((dubao, index) => {
      let spl = dubao.split("\t");
      spl.forEach((element, index) => {
        if (element == "NULL") {
          spl[index] = null;
        }
      });

      if (fitting_type.includes(Number(spl[9]))) {
        // fs.appendFileSync(appDir + "/customerok.txt", dubao + "\r\n");
        data_du_bao_san_pham.forEach((dubaosanpham, index) => {
          let spl_san_pham = dubaosanpham.split("\t");
          spl_san_pham.forEach((element, index) => {
            if (element == "NULL") {
              spl_san_pham[index] = null;
            }
          });
          if (spl[0] == spl_san_pham[1]) {
            let Customok_lense_od = spl_san_pham[2];
            if (Number(Customok_lense_od) == 1) {
              Customok_lense_od = "XMJ";
            } else if (Number(Customok_lense_od) == 2) {
              Customok_lense_od = "XM";
            } else if (Number(Customok_lense_od) == 3) {
              Customok_lense_od = "H";
            }
            if (Number(spl[9]) == 164) {
              console.log(Number(spl[9]));
              CustomerOk.create({
                refactometer_sph: spl_san_pham[14],
                refactometer_cyl: spl_san_pham[15],
                refactometer_ax: spl_san_pham[16],
                bcva_va: spl_san_pham[43],
                bcva_sph: spl_san_pham[34],
                bcva_cyl: spl_san_pham[35],
                bcva_ax: spl_san_pham[36],
                original_k1: spl_san_pham[37],
                original_k2: spl_san_pham[38],
                original_ave: spl_san_pham[39],
                original_hvid: spl_san_pham[41],
                lense: Customok_lense_od,
                k_code: spl_san_pham[5],
                power: spl_san_pham[6],
                size: spl_san_pham[7],
                ngayfitting: spl[21],
                contract_code: spl[5],
              }).then(function (data) {
                CustomerCheck.findOne({
                  where: {
                    customer_id: spl[1],
                    dttc_id: spl[2],
                  },
                }).then(function (customercheck) {
                  if (customercheck) {
                    CustomerCheck.update(
                      {
                        id_left: data.id,
                      },
                      {
                        where: {
                          id: customercheck.id,
                        },
                      }
                    );
                  } else {
                    CustomerCheck.create({
                      id: spl[0],
                      doctor_code: null,
                      doctor_id: null,
                      customer_id: spl[1],
                      dttc_id: spl[2],
                      date_examination: spl[31],
                      id_left: data.id,
                      id_right: null,
                      type: "GOV",
                    });
                  }
                });
              });
            }
          }
        });
      }
    });
  } catch (err) {
    console.error(err);
  }
}
async function main() {
  // await leftData();
  await rightData();
}

main();
