const fs = require("fs");
//npm dependency for http get request
const superagent = require("superagent");
//use callback hell by using promises
//a promise implements the concept of a future value. It means a value we are expecting to recieve
//we will wait for it to come back with the data
fs.readFile(`${__dirname}/txt/dog.txt`, "utf-8", (err, data) => {
  //end method is actually used to get data. it accepts two parameter-> err,response
  superagent
    .get(
      `https://dog.ceo/api/breed/${data}/images
`
    )
    .then((res) => {
      fs.writeFile(
        `${__dirname}/txt/doggy.txt`,
        `${res.body.message}`,
        (err) => {
          console.log(`saved`);
        }
      );
    })
    .catch((err) => {
      console.log("there is an error");
    });
});
