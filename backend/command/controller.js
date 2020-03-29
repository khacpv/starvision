const fs = require("fs");
var filesfiles = fs.readdirSync("../models/");
const path = require("path");

var arrayModel = [];
let arrayKey = [];
const modelName = process.argv[2];

readFile = function() {
  fs.readFile("controller_template/template.txt", "utf8", async (err, data) => {
    if (err) throw err;

    var result = data.replace(/MODEL_SAMPLE/g, modelName);
    result = result.replace(/LOOP_PROPERTY/g, arrayKey);
    writeFile(result);
  });
};

writeFile = function(data) {
  fs.writeFile("../controllers/"+ modelName.toLocaleLowerCase() + "_controller.js", data, err => {
    if (err) throw err;
    console.log("File is created successfully.");
  });
};
// readFile();

getListModel = () => {
  filesfiles.forEach(item => {
    let name = path.parse(item).name;
    let ext = path.parse(item).ext;
    if (ext == ".js") {
      arrayModel.push(name);
    }
  });
};

getListModelKey = () =>{
  let fileName = modelName.toLocaleLowerCase();
  fileName = "../models/" + fileName + ".js";
  
  let regex_match = /\s*:/g;
  let regex_unmatch = /(\w+)\s*:\s*(["']).+\2,?/g;
  
  var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(fileName)
  });
  
  lineReader.on('line', function (line) {
    // console.log('Line from file:', line);
    if (line.match(regex_match) && !line.match(regex_unmatch)){
      let key = line.split(":");
      let result = key[0].trim();
      result = result+": req.body."+ result + "\r\n";
      arrayKey.push(result);
    }
  });

}

main = async () => {
  await getListModel();
  await getListModelKey();
  if (arrayModel.includes(modelName.toLocaleLowerCase())) {
    readFile();
    console.log("Proccessed");
  } else {
    console.log("Model not existed");
  }
};
main();
