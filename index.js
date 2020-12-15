const axios = require("axios").default;
var unzipper = require("unzipper");
const fs = require("fs");
const Path = require("path");

let wait = 200;

const timer = (ms) => {
  new Promise((res) => setTimeout(res, ms));
};

async function dload(
  year = "2020",
  months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ]
) {
  fs.access("./data", (err) => {
    if (!err) {
      console.error("Data folder exists , downloading!");
    } else {
      fs.mkdir("./data", (err) => {
        if (err) {
          return console.error(err);
        }
        console.log("Directory created successfully, downloading!");
      });
    }
  });
  let i = 1;
  while (months.length > 0) {
    let mon = months.pop();

    while (i < 32) {
      if (i < 10) {
        let url =
          "https://www1.nseindia.com/content/historical/EQUITIES/" +
          year +
          "/" +
          mon +
          "/cm0" +
          i +
          mon +
          year +
          "bhav.csv.zip";
        await loader(url);

        i++;
      } else {
        url =
          "https://www1.nseindia.com/content/historical/EQUITIES/" +
          year +
          "/" +
          mon +
          "/cm" +
          i +
          mon +
          year +
          "bhav.csv.zip";

        await loader(url);
        i++;
      }
    }
    console.log("Fetching " + mon);
    i = 0;
  }
  async function loader(urly) {
    await timer((wait += 100));
    axios({
      method: "get",
      url: urly,
      responseType: "stream",
    })
      .then(function (response) {
        response.data.pipe(unzipper.Extract({ path: "./data/" }));
        //if need them zipped
        // response.data.pipe(fs.createWriteStream("./data/" + urly.slice(-21)));
      })
      .catch((error) => {
        //you can check if any data is skipped except holidays
      });
  }
}
module.exports = dload;