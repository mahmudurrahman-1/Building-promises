//here we are gonna use Promise instead of callback function

const fs = require("fs");
const superagent = require("superagent");

const readFilepro = (file) => {
  //promise constructor of  es6--it takes in executor function contains two arguments
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      resolve(data);
    });
  });
};

//
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      console.log(`I hope err is ${err}`);
      resolve("success");
    });
  });
};

readFilepro(`${__dirname}/txt/dog.txt`)
  .then((data) => {
    return superagent.get(
      `https://dog.ceo/api/breed/${data}/images
`
    );
  })
  .then((data) => {
    writeFilePro(`txt/sdi.txt`, `${data.body.message}`);
  })
  .then(() => {
    console.log("The file is saved successfully");
  })
  .catch((err) => {
    console.log("no error ");
  });
