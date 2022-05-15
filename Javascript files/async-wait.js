///in order to use async wait we need to create so called async fn
//mark it as an async function
//this async function will do async work without every blocking event loop
//This autometically resturns a promise
const FileSystem = require("fs");
const superagent = require("superagent");
const readFilepro = (fileName) => {
  return new Promise((resolve, reject) => {
    FileSystem.readFile(fileName, "utf-8", (err, data) => {
      if (err) {
        return reject("This file is failed");
      }
      resolve(data);
    });
  });
};

const writeFilePro = (fileName, data) => {
  return new Promise((resolve, reject) => {
    FileSystem.writeFile(fileName, `${data}`, (err, data) => {
      if (err) {
        return reject("This file is failed");
      }
      resolve("Write Successful");
    });
  });
};

const getDogPic = async () => {
  try {
    const dataout = await readFilepro(`${__dirname}/txt/dog.txt`);
    console.log(dataout);
    const res =
      await superagent.get(`https://dog.ceo/api/breed/${dataout}/images
`);
    await writeFilePro("txt/Burking Dog.txt", res.body.message);
    console.log("everything is saved");
  } catch (err) {
    console.log("error happens");
  }
};

getDogPic();
